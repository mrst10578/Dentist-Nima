#!/usr/bin/env python3
"""Collect CC/public-domain originals from Wikimedia Commons, preserving attribution."""
import hashlib,json,time,urllib.request,urllib.parse
from pathlib import Path
p=Path(__file__).resolve().parent
sources=json.loads((p/"sources.json").read_text("utf-8"))
out=p/"originals";out.mkdir(parents=True,exist_ok=True)
report=[]
for x in sources:
 name=x["original_name"]
 escaped=urllib.parse.quote(name,safe="").replace("%5F","_")
 normalized=name.replace(" ","_")
 md5=hashlib.md5(normalized.encode("utf-8")).hexdigest()
 target=out/x["filename"]
 urls=[
  "https://commons.wikimedia.org/wiki/Special:FilePath/"+escaped,
  "https://upload.wikimedia.org/wikipedia/commons/"+md5[0]+"/"+md5[:2]+"/"+escaped,
  "https://upload.wikimedia.org/wikipedia/commons/thumb/"+md5[0]+"/"+md5[:2]+"/"+escaped+"/1024px-"+escaped if target.suffix.lower() in (".jpg",".png") else "https://commons.wikimedia.org/wiki/Special:FilePath/"+escaped
 ]
 target=out/x["filename"]
 if target.is_file() and target.stat().st_size>300:
  print("EXISTS",x["id"],target.stat().st_size);continue
 errors=[];done=False
 for u in urls:
  try:
   time.sleep(5 if errors else 1)
   req=urllib.request.Request(u,headers={"User-Agent":"BioGlassStudentResearchPortfolio/1.0 (educational collection; contact via GitHub repository issues)","Accept":"image/*"})
   with urllib.request.urlopen(req,timeout=36) as response:blob=response.read(12*1024*1024+1)
   ext=target.suffix.lower();check=blob.lstrip()[:50] if ext==".svg" else blob[:10]
   if len(blob)>12*1024*1024 or len(blob)<250:raise ValueError("invalid size")
   if ext==".jpg" and not check.startswith(b"\xff\xd8\xff"):raise ValueError("invalid jpeg")
   if ext==".png" and not check.startswith(b"\x89PNG\r\n\x1a\n"):raise ValueError("invalid png")
   if ext==".svg" and not (check.startswith(b"<?xml") or check.startswith(b"<svg")):raise ValueError("invalid svg")
   target.write_bytes(blob)
   report.append({"id":x["id"],"state":"copied_original" if "/thumb/" not in u else "wikimedia_resized_copy","path":str(target.relative_to(p)),"sha256":hashlib.sha256(blob).hexdigest(),"bytes":len(blob),"creator":x["creator"],"license":x["license"],"source":x["source_url"]})
   print("OK",x["id"],len(blob));done=True;break
  except Exception as e:
   errors.append(str(e)[:200])
 if not done:
  report.append({"id":x["id"],"state":"download_failed","errors":errors})
  print("FAIL",x["id"],errors)
 time.sleep(.7)
(p/"download_report.json").write_text(json.dumps(report,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
print("DONE",sum(x["state"]=="copied_original" for x in report),"out of",len(report))
