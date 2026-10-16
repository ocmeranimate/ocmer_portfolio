const nav=document.querySelector("nav");const menu=document.querySelector(".menu-toggle");
menu?.addEventListener("click",()=>nav.classList.toggle("mobile-open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("mobile-open")));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});

const projects={
 river:{label:"01 / ANIMATED SHORT FILM",title:"Ang Awit ng mga Nalunod",text:"Fantasy-drama animated short film. Nico, a boy, discovers hidden truths through supernatural encounters connected to a river and the spirits of children.",media:[
  {src:"images/video/act%201%20scene%2014.mp4",type:"video",alt:"Act 1, scene 14"},
  {src:"images/video/act%202%20scene%2017.mp4",type:"video",alt:"Act 2, scene 17"},
  {src:"images/video/act%202%20scene%2018.2.mp4",type:"video",alt:"Act 2, scene 18.2"},
  {src:"images/video/act%202%20scene%2019.4.mp4",type:"video",alt:"Act 2, scene 19.4"},
  {src:"images/video/act%202%20scene%2024.2.mp4",type:"video",alt:"Act 2, scene 24.2"},
  {src:"images/video/act%202%20scene%203.mp4",type:"video",alt:"Act 2, scene 3"},
  {src:"images/video/act%202%20scene%209.mp4",type:"video",alt:"Act 2, scene 9"}
 ]},
 characters:{label:"02 / CHARACTER ART",title:"Character Explorations",text:"Character sheets and visual development.",media:[
  {src:"images/mc%20niko.jpg",alt:"Nico character sheet"},
  {src:"images/mc%20grandma.jpg",alt:"Grandmother character sheet"},
  {src:"images/mc%20mother.jpg",alt:"Mother character sheet"},
  {src:"images/ghost%20child%201.jpg",alt:"Ghost child character artwork"}
 ]},
 boards:{label:"03 / PRE-PRODUCTION",title:"Storyboards & Layouts",text:"Storyboard panels and scene layouts.",media:[
  {src:"images/video/rainy%20escape.mp4",type:"video",alt:"Rainy Escape storyboard"},
    {src:"images/video/STORY_BOARD.mp4",type:"video",alt:"Storyboard and layout video"}
 ]},
 art:{label:"04 / DIGITAL ART",title:"Illustration Collection",text:"Selected digital illustrations and personal artwork.",media:[
  {src:"images/altventurer.png",alt:"Altventurer illustration"},
    {src:"images/ichigo%20finals.jpg",alt:"Ichigo character illustration"},
  {src:"images/donut%20and%20mug.png",alt:"Donut and mug illustration"},
  {src:"images/my%20mc.png",alt:"Original character illustration"},
  {src:"images/pixil-frame-0%20(1).png",alt:"Pixel art illustration"},
  {src:"images/pose%20for%20me.png",alt:"Character pose illustration"},
  {src:"images/Profile%20dukoben%20oc.png",alt:"Dukoben original character illustration"},
  {src:"images/test.png",alt:"Digital illustration"}
 ]}
};
const riverVisual=document.querySelector(".project-river");
const riverPreview=document.querySelector(".river-preview");
let riverClipIndex=0;

function playRiverClip(index){
 riverClipIndex=index;
 riverPreview.src=projects.river.media[riverClipIndex].src;
 riverPreview.load();
 riverPreview.play().catch(()=>riverVisual.classList.add("preview-unavailable"));
}

riverPreview.addEventListener("playing",()=>{
 riverVisual.classList.remove("preview-unavailable");
 riverVisual.classList.add("preview-playing");
});
riverPreview.addEventListener("ended",()=>{
 playRiverClip((riverClipIndex+1)%projects.river.media.length);
});
riverPreview.addEventListener("error",()=>{
 riverVisual.classList.remove("preview-playing");
 riverVisual.classList.add("preview-unavailable");
});
playRiverClip(0);

function cycleThumbnail(image,items){
 let index=0;
 items.forEach(item=>{
  const preload=new Image();
  preload.src=item.src;
 });
 window.setInterval(()=>{
  index=(index+1)%items.length;
  image.classList.add("is-changing");
  window.setTimeout(()=>{
   image.src=items[index].src;
   image.alt=items[index].alt;
   image.classList.remove("is-changing");
  },220);
 },3600);
}

cycleThumbnail(document.querySelector(".art-portrait .card-media"),projects.characters.media);
cycleThumbnail(document.querySelector(".art-illustration .card-media"),projects.art.media);

const storyboardCard=document.querySelector(".art-storyboard");
const storyboardPreview=storyboardCard.querySelector("video");
storyboardPreview.addEventListener("playing",()=>storyboardCard.classList.add("preview-playing"));
storyboardPreview.addEventListener("error",()=>storyboardCard.classList.remove("preview-playing"));

function openModal(id){
 const p=projects[id]; document.getElementById("modal-label").textContent=p.label;
 document.getElementById("modal-title").textContent=p.title; document.getElementById("modal-text").textContent=p.text;
 const gallery=document.getElementById("modal-art"); gallery.replaceChildren();
 if(p.media.length){
  p.media.forEach(item=>{
   const media=document.createElement(item.type==="video"?"video":"img");
   media.className="modal-media"; media.src=item.src;
    if(item.type==="video"){media.controls=true;media.playsInline=true;media.preload="metadata";media.setAttribute("aria-label",item.alt)}
   else media.alt=item.alt;
   gallery.append(media);
  });
 }else{
  gallery.textContent="Project artwork coming soon.";
 }
 document.getElementById("modal").classList.add("open");document.getElementById("modal").setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
}
function closeModal(){document.getElementById("modal").classList.remove("open");document.getElementById("modal").setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
