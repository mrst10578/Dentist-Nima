
/* Standalone Three.js diagram for the Cloudflare mirror. Shapes intentionally schematic. */
(async()=>{
 const host=document.getElementById("lab-canvas");
 if(!host)return;
 const descriptions={
  enamel:["مینا","ENAMEL","لایه سخت پوشاننده تاج دندان که از بافت‌های زیرین محافظت می‌کند.","پوسته خارجی تاج در این مدل نیمه‌شفاف است."],
  dentin:["عاج","DENTIN","بافت معدنی زیر مینا که بخش عمده حجم تاج و ریشه را می‌سازد.","نمای شماتیک با حجم داخلی روشن."],
  pulp:["پالپ","PULP","بافت نرم مرکزی شامل عروق خونی و اعصاب.","مسیر پالپ صرفاً برای نمایش نسبی رسم شده است."],
  root:["ریشه","ROOT","بخش دندان درون استخوان آلوئول که در نگهداری دندان نقش دارد.","این شکل ابعاد بالینی معتبر ندارد."]
 };
 const choices=[...document.querySelectorAll("[data-layer]")];
 let selected="enamel",setFocus=()=>{},resetCamera=()=>{};
 function select(id){
  if(!descriptions[id])return; selected=id;
  for(const b of choices){const on=b.dataset.layer===id;b.setAttribute("aria-pressed",String(on));b.classList.toggle("is-active",on);}
  const d=descriptions[id];
  document.getElementById("lab-info-title").textContent=d[0];
  document.getElementById("lab-info-latin").textContent=d[1]+" / SELECTED";
  document.getElementById("lab-info-text").textContent=d[2];
  document.getElementById("lab-info-note").textContent=d[3];
  host.setAttribute("aria-label","مدل شماتیک دندان؛ ناحیه انتخاب‌شده: "+d[0]);
  setFocus(id);
 }
 choices.forEach(b=>b.addEventListener("click",()=>select(b.dataset.layer)));
 document.getElementById("lab-reset").addEventListener("click",()=>{resetCamera();select("enamel");});
 select("enamel");
 let probe;
 try{probe=document.createElement("canvas").getContext("webgl2")||document.createElement("canvas").getContext("webgl");}
 catch(e){return;}
 if(!probe)return;
 let THREE;
 try{THREE=await import("https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js");}
 catch(e){return;}
 let renderer;
 try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:"low-power"});}
 catch(e){return;}
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.setClearColor(0,0);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(34,1,.1,30);
 camera.position.set(.25,.3,6.2);camera.lookAt(0,-.15,0);
 scene.add(new THREE.AmbientLight(0xffffff,1.1),new THREE.HemisphereLight(0xf2ffff,0x69b2c9,2.1));
 const key=new THREE.DirectionalLight(0xffffff,3.2);key.position.set(-3,5,5);scene.add(key);
 const rim=new THREE.DirectionalLight(0x55c6e9,2);rim.position.set(4,1,-3);scene.add(rim);
 const model=new THREE.Group();model.rotation.set(-.12,-.37,0);scene.add(model);
 const parts=[];
 function add(geo,id,color,opacity,position,scale){
  const mat=new THREE.MeshPhysicalMaterial({color,transparent:true,opacity,depthWrite:false,side:THREE.DoubleSide,roughness:.19,metalness:.06,clearcoat:.95});
  const mesh=new THREE.Mesh(geo,mat);mesh.position.set(...position);mesh.scale.set(...scale);
  model.add(mesh);parts.push({id,mesh,opacity});return mesh;
 }
 add(new THREE.SphereGeometry(.96,72,32,.1,Math.PI*1.69,0,Math.PI),"enamel",0xbff8ff,.49,[0,.56,0],[1.08,.91,.88]);
 add(new THREE.SphereGeometry(.78,56,28,.1,Math.PI*1.68),"dentin",0xf4dba7,.74,[0,.53,0],[1.02,.85,.88]);
 add(new THREE.SphereGeometry(.35,36,22),"pulp",0xea8692,.91,[0,.46,.08],[.82,1.15,.82]);
 const roots=[
  [[-.42,.04,.15],[-.55,-.46,.15],[-.60,-1.12,.2],[-.81,-1.69,.19]],
  [[.42,.04,.16],[.55,-.47,.14],[.68,-1.14,.18],[.79,-1.65,.1]],
  [[.02,.05,-.24],[.09,-.5,-.37],[-.06,-1.23,-.49],[-.13,-1.68,-.48]]
 ];
 for(const points of roots){
  const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));
  add(new THREE.TubeGeometry(curve,38,.19,13,false),"root",0x8bcbd8,.86,[0,0,0],[1,1,1]);
  add(new THREE.TubeGeometry(curve,32,.04,9,false),"pulp",0xce7885,.83,[0,0,0],[1,1,1]);
 }
 const band=add(new THREE.TorusGeometry(.84,.012,8,96),"enamel",0x5ebdcc,.38,[0,.25,0],[1,1,.84]);band.rotation.x=1.37;
 setFocus=id=>{
  for(const p of parts){
   p.mesh.material.opacity=p.id===id?Math.min(1,p.opacity+.13):Math.max(.12,p.opacity*.42);
   p.mesh.material.emissive.setHex(p.id===id?0x315d6b:0x000000);
   p.mesh.material.emissiveIntensity=p.id===id?.13:0;
  }
 };
 setFocus(selected);
 host.appendChild(renderer.domElement);
 host.dataset.render="ready";
 const fallback=document.getElementById("lab-static");if(fallback){fallback.hidden=true;fallback.style.display="none";}
 document.getElementById("lab-led").textContent="WEBGL ACTIVE";
 let yaw=-.37,drag=false,lastX=0,visible=true,raf=0,dead=false,lastTime=0;
 resetCamera=()=>{yaw=-.37;};
 host.addEventListener("pointerdown",e=>{if(e.pointerType==="mouse"){drag=true;lastX=e.clientX;}});
 host.addEventListener("pointermove",e=>{if(drag){yaw+=(e.clientX-lastX)*.009;lastX=e.clientX;}});
 host.addEventListener("pointerup",()=>drag=false);host.addEventListener("pointerleave",()=>drag=false);
 const resize=()=>{const r=host.getBoundingClientRect();if(!r.width||!r.height)return;camera.aspect=r.width/r.height;camera.position.z=r.width<430?7.4:6.2;camera.updateProjectionMatrix();renderer.setSize(r.width,r.height,false);renderer.render(scene,camera);};
 const observer=new ResizeObserver(resize);observer.observe(host);
 const tick=ms=>{if(!visible||dead)return;raf=requestAnimationFrame(tick);if(ms-lastTime<32)return;lastTime=ms;model.rotation.y+=(yaw-model.rotation.y)*.065;renderer.render(scene,camera);};
 const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){cancelAnimationFrame(raf);raf=requestAnimationFrame(tick);}else cancelAnimationFrame(raf);},{threshold:.01});
 io.observe(host);resize();raf=requestAnimationFrame(tick);
 window.addEventListener("pagehide",()=>{dead=true;cancelAnimationFrame(raf);io.disconnect();observer.disconnect();for(const p of parts){p.mesh.geometry.dispose();p.mesh.material.dispose();}renderer.dispose();},{once:true});
})();
