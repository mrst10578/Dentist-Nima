
import {
  AmbientLight, CatmullRomCurve3, Color, DirectionalLight, DoubleSide, Group,
  HemisphereLight, Mesh, MeshPhysicalMaterial, PerspectiveCamera, Scene,
  SphereGeometry, TorusGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from "three";
import type { LayerId } from "@/lib/visual-data";
type Part = { layer: LayerId; mesh: Mesh; normalOpacity: number };
export type LabScene = { select: (layer: LayerId) => void; reset: () => void; dispose: () => void };

/** A stylized teaching schematic, NOT a clinically verified tooth model. */
export function mountAnatomyScene(host: HTMLElement, initial: LayerId): LabScene {
  const renderer = new WebGLRenderer({alpha:true,antialias:true,powerPreference:"low-power"});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1,1.5));
  renderer.setClearColor(0x000000,0);
  const scene = new Scene();
  scene.add(new AmbientLight(0xffffff,1.15),new HemisphereLight(0xf3ffff,0x70b5d0,2.1));
  const key=new DirectionalLight(0xffffff,3.1); key.position.set(-3,5,5);scene.add(key);
  const rim=new DirectionalLight(0x5ac9eb,2.1);rim.position.set(4,1,-3);scene.add(rim);
  const camera=new PerspectiveCamera(34,1,.1,30);camera.position.set(.25,.35,6.3);camera.lookAt(0,-.15,0);
  const model=new Group();model.rotation.set(-.12,-.37,0);scene.add(model);
  const parts:Part[]=[];
  const add=(geo:Mesh["geometry"],layer:LayerId,hex:string,opacity:number,pos:[number,number,number],scale:[number,number,number])=>{
    const mat=new MeshPhysicalMaterial({color:new Color(hex),transparent:true,opacity,depthWrite:false,side:DoubleSide,roughness:.19,metalness:.06,clearcoat:.95,transmission:layer==="enamel"?.12:.03});
    const mesh=new Mesh(geo,mat);mesh.position.set(...pos);mesh.scale.set(...scale);
    model.add(mesh);parts.push({layer,mesh,normalOpacity:opacity});return mesh;
  };
  add(new SphereGeometry(.96,72,32,.1,Math.PI*1.69,0,Math.PI),"enamel","#c4f8ff",.49,[0,.56,0],[1.08,.91,.88]);
  add(new SphereGeometry(.78,56,28,.1,Math.PI*1.68),"dentin","#efd7a7",.74,[0,.53,0],[1.02,.85,.88]);
  add(new SphereGeometry(.35,36,22),"pulp","#e98691",.93,[0,.46,.08],[.82,1.15,.82]);
  const roots:Vector3[][]=[
    [new Vector3(-.42,.04,.15),new Vector3(-.55,-.46,.15),new Vector3(-.6,-1.12,.2),new Vector3(-.81,-1.69,.19)],
    [new Vector3(.42,.04,.16),new Vector3(.55,-.47,.14),new Vector3(.68,-1.14,.18),new Vector3(.79,-1.65,.1)],
    [new Vector3(.02,.05,-.24),new Vector3(.09,-.5,-.37),new Vector3(-.06,-1.23,-.49),new Vector3(-.13,-1.68,-.48)],
  ];
  for(const path of roots){
    const curve=new CatmullRomCurve3(path);
    add(new TubeGeometry(curve,36,.19,14,false),"root","#87c9d7",.86,[0,0,0],[1,1,1]);
    add(new TubeGeometry(curve,28,.04,8,false),"pulp","#cb737f",.85,[0,0,0],[1,1,1]);
  }
  const rimBand=add(new TorusGeometry(.84,.012,6,90),"enamel","#6abdc9",.45,[0,.25,0],[1,1,.84]);
  rimBand.rotation.x=1.37;
  let focus:LayerId=initial;
  const select=(layer:LayerId)=>{
    focus=layer;
    for(const part of parts){
      const mat=part.mesh.material as MeshPhysicalMaterial;
      mat.opacity=part.layer===focus?Math.min(1,part.normalOpacity+.13):Math.max(.12,part.normalOpacity*.42);
      mat.emissive=new Color(part.layer===focus?"#315d6b":"#000000");
      mat.emissiveIntensity=part.layer===focus?.13:0;
    }
  };
  select(focus);
  renderer.domElement.className="lab-webgl";
  renderer.domElement.setAttribute("aria-hidden","true");
  host.appendChild(renderer.domElement);
  let visible=true,stopped=false,raf=0,drag=false,lastX=0,yaw=model.rotation.y,last=0;
  const onDown=(e:PointerEvent)=>{if(e.pointerType==="mouse"){drag=true;lastX=e.clientX;}};
  const onMove=(e:PointerEvent)=>{if(drag){yaw+=(e.clientX-lastX)*.009;lastX=e.clientX;}};
  const onUp=()=>{drag=false;};
  host.addEventListener("pointerdown",onDown);host.addEventListener("pointermove",onMove);
  host.addEventListener("pointerup",onUp);host.addEventListener("pointerleave",onUp);
  function resize(){
    const {width,height}=host.getBoundingClientRect();if(!width||!height)return;
    camera.aspect=width/height;camera.position.z=width<430?7.4:6.3;
    camera.updateProjectionMatrix();renderer.setSize(Math.round(width),Math.round(height),false);renderer.render(scene,camera);
  }
  const ro=new ResizeObserver(resize);ro.observe(host);
  const render=(now:number)=>{
    if(!visible||stopped)return;
    raf=requestAnimationFrame(render);
    if(now-last>=32){
      last=now;model.rotation.y+=(yaw-model.rotation.y)*.065;
      renderer.render(scene,camera);
    }
  };
  const io=new IntersectionObserver(([entry])=>{
    visible=entry.isIntersecting;
    if(visible&&!stopped){cancelAnimationFrame(raf);raf=requestAnimationFrame(render);}
    else cancelAnimationFrame(raf);
  },{threshold:.01});io.observe(host);resize();raf=requestAnimationFrame(render);
  return {
    select,
    reset:()=>{yaw=-.37;select("enamel");},
    dispose:()=>{
      stopped=true;cancelAnimationFrame(raf);ro.disconnect();io.disconnect();
      host.removeEventListener("pointerdown",onDown);host.removeEventListener("pointermove",onMove);
      host.removeEventListener("pointerup",onUp);host.removeEventListener("pointerleave",onUp);
      for(const p of parts){p.mesh.geometry.dispose();(p.mesh.material as MeshPhysicalMaterial).dispose();}
      renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();
    },
  };
}
