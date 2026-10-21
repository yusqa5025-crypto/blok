const http = require("http");
const WebSocket = require("ws");
const server = http.createServer((req,res) => {
  res.writeHead(200, {"content-type":"application/json"});
  res.end(JSON.stringify({ok:true, service:"Arena Online WebSocket", clients:wss.clients.size}));
});
const wss = new WebSocket.Server({server});
const players = new Map();
let nextId = 1;
const orbs = [];
function spawn(){while(orbs.length<18)orbs.push({x:25+Math.random()*550,y:25+Math.random()*550,r:7});}
function sendState(){
  spawn();
  const list=[...players.values()];
  for(const p of list){
    if(p.ws.readyState!==WebSocket.OPEN)continue;
    const near=list.map(q=>({id:q.id,name:q.name,x:q.x,y:q.y,r:15,color:q.color})); 
    p.ws.send(JSON.stringify({type:"state",you:p.id,players:near,orbs,score:p.score}));
  }
}
wss.on("connection", ws=>{
  const id=String(nextId++);
  const p={id,name:"Oyuncu"+id,x:80+Math.random()*440,y:80+Math.random()*440,score:0,color:["#8b7cff","#ff6f91","#55d6be","#ffcc66"][Number(id)%4],ws};
  players.set(id,p);
  ws.on("message", raw=>{
    let d;try{d=JSON.parse(raw.toString())}catch{return}
    if(d.type==="join"&&typeof d.name==="string")p.name=d.name.slice(0,16)||p.name;
    if(d.type==="move"){
      if(Number.isFinite(d.x))p.x=Math.max(15,Math.min(585,d.x));
      if(Number.isFinite(d.y))p.y=Math.max(15,Math.min(585,d.y));
      for(let i=orbs.length-1;i>=0;i--){
        if(Math.hypot(orbs[i].x-p.x,orbs[i].y-p.y)<22){orbs.splice(i,1);p.score+=10;}
      }
    }
  });
  ws.on("close",()=>players.delete(id));
  ws.on("error",()=>players.delete(id));
});
setInterval(sendState,100);
const port=process.env.PORT||8080;
server.listen(port,"0.0.0.0",()=>console.log("Arena server listening on "+port));
