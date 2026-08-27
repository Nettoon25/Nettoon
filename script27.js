const now = new Date();
const makeDate = (days, hour, minute=0) => { const d=new Date(); d.setDate(d.getDate()+days); d.setHours(hour,minute,0,0); return d; };
let items = [
 {id:1,title:'Zygote',type:'One-time Video',contentType:'video',release:makeDate(0,22,2),status:'scheduled',schedule:'One-time release',duration:'00:05'},
 {id:2,title:'Episode 2 — Awakening',type:'Series • Episode 2',contentType:'series',series:'Zygote',release:makeDate(2,19),status:'scheduled',schedule:'Series schedule',duration:'08:42'},
 {id:3,title:'Episode 3 — The Choice',type:'Series • Episode 3',contentType:'series',series:'Zygote',release:makeDate(4,19),status:'scheduled',schedule:'Series schedule',duration:'10:15'},
 {id:4,title:'Episode 4 — Origins',type:'Series • Episode 4',contentType:'series',series:'Zygote',release:makeDate(6,19),status:'scheduled',schedule:'Series schedule',duration:'11:04'},
 {id:5,title:'Episode 5 — The Signal',type:'Series • Episode 5',contentType:'series',series:'Zygote',release:makeDate(8,19),status:'scheduled',schedule:'Series schedule',duration:'09:31'},
 {id:11,title:'The 30-Second Origin',type:'Short',contentType:'short',release:makeDate(1,12),status:'scheduled',schedule:'Short release',duration:'00:30'},
 {id:12,title:'Animation Fact #04',type:'Short',contentType:'short',release:makeDate(3,18,30),status:'scheduled',schedule:'Short release',duration:'00:27'},
 {id:6,title:'Behind the Scenes',type:'One-time Video',contentType:'video',release:makeDate(-1,17),status:'published',schedule:'Published',duration:'06:12'},
 {id:7,title:'Creator Intro',type:'One-time Video',contentType:'video',release:null,status:'draft',schedule:'Not scheduled',duration:'02:04'},
 {id:8,title:'My First Animation',type:'One-time Video',contentType:'video',release:null,status:'private',schedule:'Private',duration:'03:40'},
 {id:9,title:'Trailer — Nettoon Originals',type:'One-time Video',contentType:'video',release:null,status:'processing',schedule:'Processing',duration:'00:48'},
 {id:10,title:'Old Export',type:'One-time Video',contentType:'video',release:null,status:'failed',schedule:'Upload failed',duration:'00:31'}
];
let currentFilter='scheduled', currentType='all', editingId=null, pendingAction=null;
const fmtDate=d=>d?d.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}):'—';
const fmtTime=d=>d?d.toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit'}):'—';
const fmtFull=d=>d?`${fmtDate(d)}, ${fmtTime(d)}`:'—';
const statusLabel={scheduled:'Scheduled',published:'Published',draft:'Draft',private:'Private',processing:'Processing',failed:'Failed'};
function render(){
 const q=document.getElementById('search').value.trim().toLowerCase(); const sort=document.getElementById('sort').value;
 let list=items.filter(x=>x.status===currentFilter && (currentType==='all'||x.contentType===currentType) && x.title.toLowerCase().includes(q));
 if(sort==='soonest') list.sort((a,b)=>(a.release||new Date(9999,0))- (b.release||new Date(9999,0)));
 if(sort==='latest') list.sort((a,b)=>(b.release||new Date(0))- (a.release||new Date(0)));
 if(sort==='title') list.sort((a,b)=>a.title.localeCompare(b.title));
 const rows=document.getElementById('rows'); rows.innerHTML='';
 list.forEach(x=>{const tr=document.createElement('tr'); tr.innerHTML=`
  <td><div class="content"><div class="thumb"><div class="play"><b>▶</b></div></div><div><div class="name">${esc(x.title)}</div><div class="meta">${esc(x.type)} • ${x.duration}</div></div></div></td>
  <td><div class="release">${x.release?fmtDate(x.release):'Not scheduled'}<small>${x.release?fmtTime(x.release):x.schedule}</small></div></td>
  <td><span class="status ${x.status}"><i class="dot"></i>${statusLabel[x.status]}</span></td>
  <td>${esc(x.schedule)}</td>
  <td><div class="actions">${actionsFor(x)}</div></td>`; rows.appendChild(tr); });
 document.getElementById('empty').style.display=list.length?'none':'block'; document.querySelector('.table').style.display=list.length?'table':'none';
 const typeLabel=currentType==='all'?'':` ${currentType==='video'?'one-time video':currentType==='series'?'series':'short'} `; document.getElementById('resultCount').textContent=`Showing ${list.length}${typeLabel} ${statusLabel[currentFilter].toLowerCase()} item${list.length===1?'':'s'}`;
 document.getElementById('scheduledCount').textContent=items.filter(x=>x.status==='scheduled').length;
 const scheduled=items.filter(x=>x.status==='scheduled');
 const counts={video:scheduled.filter(x=>x.contentType==='video').length,series:scheduled.filter(x=>x.contentType==='series').length,short:scheduled.filter(x=>x.contentType==='short').length};
 document.getElementById('typeAllCount').textContent=scheduled.length;
 document.getElementById('typeVideoCount').textContent=counts.video;
 document.getElementById('typeSeriesCount').textContent=counts.series;
 document.getElementById('typeShortCount').textContent=counts.short;
 document.getElementById('summaryVideo').textContent=counts.video;
 document.getElementById('summarySeries').textContent=counts.series;
 document.getElementById('summaryShort').textContent=counts.short;
}
function actionsFor(x){
 if(x.status==='scheduled') return `<button class="iconbtn" title="Edit Schedule" onclick="editSchedule(${x.id})">Edit</button><button class="iconbtn" title="Publish Now" onclick="askAction('publish',${x.id})">Publish Now</button><button class="iconbtn" title="Cancel Schedule" onclick="askAction('cancel',${x.id})">Cancel</button><button class="iconbtn danger" title="Delete" onclick="askAction('delete',${x.id})">Delete</button>`;
 if(x.status==='draft') return `<button class="iconbtn" onclick="toast('Opening draft editor…')">Edit</button><button class="iconbtn" onclick="toast('Opening scheduler…')">Schedule</button>`;
 if(x.status==='published') return `<button class="iconbtn" onclick="toast('Opening published content…')">View</button>`;
 if(x.status==='private') return `<button class="iconbtn" onclick="toast('Opening content editor…')">Edit</button><button class="iconbtn" onclick="toast('Content can be scheduled from the editor.')">Schedule</button>`;
 if(x.status==='processing') return `<button class="iconbtn" onclick="toast('Processing details opened.')">Details</button>`;
 return `<button class="iconbtn" onclick="toast('Retrying upload…')">Retry</button><button class="iconbtn danger" onclick="askAction('delete',${x.id})">Delete</button>`;
}
function editSchedule(id){const x=items.find(i=>i.id===id); editingId=id; document.getElementById('editTitle').textContent=x.title; const d=x.release||new Date(); document.getElementById('editDate').value=d.toISOString().slice(0,10); document.getElementById('editTime').value=d.toTimeString().slice(0,5); document.getElementById('editOverlay').classList.add('open');}
function saveSchedule(){const x=items.find(i=>i.id===editingId); const date=document.getElementById('editDate').value,time=document.getElementById('editTime').value;if(!date||!time){toast('Choose a release date and time.');return} const d=new Date(`${date}T${time}`); if(d<=new Date()){toast('Release time must be in the future.');return} x.release=d;x.status='scheduled';x.schedule='Scheduled release';closeModal('editOverlay');render();toast('Schedule updated successfully.');}
function askAction(action,id){const x=items.find(i=>i.id===id);pendingAction={action,id};const text={publish:`Publish “${x.title}” immediately? It will stop waiting for the scheduled time and become public now.`,cancel:`Cancel the schedule for “${x.title}”? The content will remain available and will not be deleted.`,delete:`Delete “${x.title}”? This action removes it from your content list.`};document.getElementById('confirmTitle').textContent=action==='delete'?'Delete Content':action==='publish'?'Publish Now':'Cancel Schedule';document.getElementById('confirmText').textContent=text[action];document.getElementById('confirmBtn').textContent=action==='delete'?'Delete':action==='publish'?'Publish Now':'Cancel Schedule';document.getElementById('confirmOverlay').classList.add('open');}
document.getElementById('confirmBtn').onclick=()=>{const {action,id}=pendingAction,x=items.find(i=>i.id===id);if(action==='publish'){x.status='published';x.schedule='Published';x.release=new Date();toast('Content published successfully.')}else if(action==='cancel'){x.status='draft';x.schedule='Not scheduled';toast('Schedule cancelled. Content saved as a draft.')}else if(action==='delete'){items=items.filter(i=>i.id!==id);toast('Content deleted.')}closeModal('confirmOverlay');render();};
function closeModal(id){document.getElementById(id).classList.remove('open')}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),2800)}
function goUpload(){toast('Opening Upload Content…')}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');currentFilter=btn.dataset.filter;render()}));
document.getElementById('search').addEventListener('input',render);document.getElementById('sort').addEventListener('change',render);
document.querySelectorAll('.type-tab').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.type-tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');currentType=btn.dataset.type;render();}));
document.querySelectorAll('.overlay').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('open')}));

/* CREATOR STUDIO VIEW ROUTER
   Each sidebar destination owns its own isolated page/view.
   Only the selected view is visible at any one time. */
const studioViews = {
  dashboard: document.getElementById('dashboardView'),
  content: document.getElementById('contentView'),
  upload: document.getElementById('uploadView'),
  analytics: document.getElementById('analyticsView'),
  comments: document.getElementById('commentsView'),
  earnings: document.getElementById('earningsView'),
  settings: document.getElementById('settingsView'),
  help: document.getElementById('helpView')
};

function showStudioView(viewName, updateHash = true){
  const target = studioViews[viewName] ? viewName : 'content';

  Object.entries(studioViews).forEach(([name, el]) => {
    if (el) el.classList.toggle('active-view', name === target);
  });

  document.querySelectorAll('.nav a[data-view]').forEach(link => {
    link.classList.toggle('active', link.dataset.view === target);
  });

  if (updateHash) {
    history.replaceState(null, '', '#' + target);
  }

  window.scrollTo({top: 0, behavior: 'instant'});

  // Keep the Content page's existing filters/rendering intact when returning to it.
  if (target === 'content' && typeof render === 'function') {
    render();
  }
}

document.querySelectorAll('.nav a[data-view]').forEach(link => {
  link.addEventListener('click', function(event){
    event.preventDefault();
    showStudioView(this.dataset.view);
  });
});

const initialView = location.hash.replace('#','').toLowerCase();
showStudioView(initialView && studioViews[initialView] ? initialView : 'content', false);

window.addEventListener('hashchange', () => {
  const requested = location.hash.replace('#','').toLowerCase();
  showStudioView(studioViews[requested] ? requested : 'content', false);
});

render();