// hero slides
let heroSlides =  [
    { 
    image:"images/herobg3.jpg",
    text:"A place where hands create Futures"
}
,    {
    image:"images/salon (2).jpg",
    text:"A home where Skills meet Purpose"
},
 {
    image:"images/herobg4.jpg",
    text:"Not Just Certificates, Skills that Pay bills"
},
]
let heroBgImage = document.getElementById("herobg");
let heroText = document.getElementById("herotext");
let current = 0;
function renderSlide(){
    const slide = heroSlides[current]
    heroBgImage.src = slide.image
    heroText.innerText = slide.text
    current = (current + 1) % heroSlides.length
 
}
renderSlide()
setInterval(renderSlide,3000)




// Courses Filter
function filterCourses(cat, btn){
  document.querySelectorAll('.f-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.c-card').forEach(c=>{
    c.style.display = (cat==='all' || c.dataset.cat===cat) ? 'block' : 'none';
  });
}
function toggleExpand(btn){
  const box = btn.nextElementSibling;
  const isOpen = box.classList.contains('open');
  document.querySelectorAll('.expand-box').forEach(b=>b.classList.remove('open'));
  document.querySelectorAll('.exp-btn').forEach(b=>b.innerText='View Details ↓');
  if(!isOpen){ box.classList.add('open'); btn.innerText='Show Less ↑'; }
}
// contact page
function saveLocal(data){
  const all = JSON.parse(localStorage.getItem('bugema_contacts')||'[]');
  all.push({...data, time: new Date().toLocaleString()});
  localStorage.setItem('bugema_contacts', JSON.stringify(all));
}

// Hambeguer Menu
   function toggleNav() {
        document.getElementById("drawer").classList.toggle("open");
        document.getElementById("overlay").classList.toggle("show");
        document.getElementById("hambeguerWrap").classList.toggle("active");
        document.body.style.overflow = document.getElementById("drawer").classList.contains("open") ? 'hidden' :'';
    }

// scrolling up
window.onscroll =  ()=>{
  document.getElementById('scrollUp').style.display = window.scrollY >400 ? "flex" :"none"
  
}


// Event functionalities
            function searchEvents() {
                let input = document.getElementById("searchInput").value.toLowerCase();
                let cards = document.querySelectorAll(".event-card");
                let visible = 0;
                cards.forEach((card) => {
                    let text = card.innerText.toLowerCase();
                    if (text.includes(input)) {
                        card.classList.remove("hide");
                        visible++;
                    } else {
                        card.classList.add("hide");
                    }
                });
                document.getElementById("count").innerText =
                    "Showing " + visible + " events";
                document.getElementById("noResult").style.display =
                    visible === 0 ? "block" : "none";
            }

            function filterEvents(category, btn) {
                document
                    .querySelectorAll(".event-filters button")
                    .forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                let cards = document.querySelectorAll(".event-card");
                let visible = 0;
                cards.forEach((card) => {
                    if (category === "all" || card.dataset.category === category) {
                        card.classList.remove("hide");
                        visible++;
                    } else {
                        card.classList.add("hide");
                    }
                });
                document.getElementById("count").innerText =
                    "Showing " + visible + " events";
                document.getElementById("noResult").style.display =
                    visible === 0 ? "block" : "none";
                document.getElementById("searchInput").value = "";
            }
            
// ADD TO CALENDAR - works on phone
function addToCal(title, dateStr, location){
  const start = new Date(dateStr);
  const end = new Date(start.getTime()+2*60*60*1000);
  const fmt = d=>d.toISOString().replace(/[-:]/g,'').split('.')[0]+'Z';
  const ics=`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${fmt(start)}\nDTEND:${fmt(end)}\nSUMMARY:${title}\nLOCATION:${location}\nDESCRIPTION:Bugema University Vocational\nEND:VEVENT\nEND:VCALENDAR`;
  const blob=new Blob([ics],{type:'text/calendar'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download=title+'.ics'; a.click();
  // Google calendar backup
  setTimeout(()=>{
    const g=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${fmt(start)}/${fmt(end)}&location=${encodeURIComponent(location)}`;
    window.open(g,'_blank');
  },300);
}

// WATCH VIDEO - works
function watchVideo(src, title){
  document.getElementById('videoTitle').innerText=title;
  const v=document.getElementById('eventVideo');
  v.src=src;
  document.getElementById('videoModal').classList.add('active');
  v.play();
}
function closeVideo(){
  const v=document.getElementById('eventVideo');
  v.pause(); v.src='';
  document.getElementById('videoModal').classList.remove('active');
}



