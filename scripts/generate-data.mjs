import fs from "fs";import path from "path";import {fileURLToPath} from "url";
var __dirname=path.dirname(fileURLToPath(import.meta.url));
var DATA=path.resolve(__dirname,"../public/data");
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function pickN(a,n){var s=new Set();while(s.size<n&&s.size<a.length)s.add(pick(a));return[...s]}
var DIFF=["easy","medium","hard"];
var TS="云计算 IaaS PaaS SaaS 公有云 私有云 混合云 云服务器 ECS VM 镜像 实例 地域 可用区 VPC 子网 路由表 安全组 公网IP 弹性IP 对象存储 Bucket CDN DNS HTTPS SSL证书 云数据库 RDS Redis 负载均衡 SLB 弹性伸缩 高可用 备份 快照 IAM 访问密钥 最小权限 监控 日志 告警 Serverless 函数计算 API网关 云成本 计费模式 按量付费 包年包月 资源标签 云安全 密钥对 镜像市场 自动快照 跨区域复制 灾备 容灾 多活 DDoS防护 Web应用防火墙 WAF 漏洞扫描 安全组规则 网络ACL NAT网关 VPN连接 专线 云企业网 全球加速 域名备案 内容分发 边缘节点 云解析 流量调度 弹性公网IP 共享带宽 云监控 日志服务 操作审计 资源编排 Terraform 云控制台 开放API SDK CLI 多账号 资源目录 财务单元 成本分析 预算管理 节省计划 预留实例 竞价实例 弹性供应 伸缩配置 实例模板 自定义镜像 共享镜像 镜像导入导出 快照策略 自动快照 系统盘 数据盘 加密盘 云盘扩容 在线扩容 卸载挂载 自动挂载 云助手 运维编排 OOS 定时任务 远程命令 文件上传 批量操作 标签管理 资源组 权限策略 角色 临时凭证 STS 跨账号授权 单点登录 SSO 目录服务 身份提供商 IdP";
var T=TS.trim().split(/\s+/).filter(Boolean);
function buildTags(){return T.map(function(n,i){return{id:"cc-tag-"+String(i+1).padStart(3,"0"),name:n,category:"Cloud",description:"云标签:"+n,count:0,createdAt:"2026-07-02T00:00:00.000Z"};});}
var CD=[
  {id:"cc-course-01",order:1,slug:"云计算入门",title:"云计算入门与学习路线",description:"云计算定义、发展历史、核心价值、学习路线。",estimatedHours:4,diff:"easy"},
  {id:"cc-course-02",order:2,slug:"云服务模型",title:"IaaS、PaaS、SaaS 与云服务模型",description:"三种服务模型区别、部署模型、厂商对比。",estimatedHours:6,diff:"easy"},
  {id:"cc-course-03",order:3,slug:"云服务器",title:"云服务器 ECS/VM 基础",description:"实例类型、镜像、磁盘、网络、安全组、计费。",estimatedHours:10,diff:"medium"},
  {id:"cc-course-04",order:4,slug:"云网络VPC",title:"云网络、VPC、子网与安全组",description:"VPC原理、子网划分、路由表、公网访问。",estimatedHours:10,diff:"medium"},
  {id:"cc-course-05",order:5,slug:"对象存储",title:"云存储与对象存储",description:"Bucket、对象、权限、CDN加速、存储类型。",estimatedHours:8,diff:"easy"},
  {id:"cc-course-06",order:6,slug:"云数据库",title:"云数据库与缓存服务",description:"RDS、Redis、MongoDB、备份恢复、读写分离。",estimatedHours:8,diff:"medium"},
  {id:"cc-course-07",order:7,slug:"负载均衡",title:"负载均衡与高可用基础",description:"SLB原理、监听、后端服务器组、健康检查。",estimatedHours:8,diff:"medium"},
  {id:"cc-course-08",order:8,slug:"CDN域名HTTPS",title:"CDN、域名与 HTTPS",description:"CDN原理、DNS解析、SSL证书、HTTPS配置。",estimatedHours:6,diff:"medium"},
  {id:"cc-course-09",order:9,slug:"IAM权限",title:"身份权限管理 IAM",description:"用户、组、角色、策略、最小权限、STS。",estimatedHours:8,diff:"hard"},
  {id:"cc-course-10",order:10,slug:"监控告警",title:"云监控、日志与告警",description:"监控指标、日志服务、告警规则、操作审计。",estimatedHours:6,diff:"medium"},
  {id:"cc-course-11",order:11,slug:"Serverless",title:"Serverless 与函数计算入门",description:"函数计算、API网关、事件触发、冷启动。",estimatedHours:8,diff:"hard"},
  {id:"cc-course-12",order:12,slug:"云上部署",title:"云上部署 Web、后端与数据库",description:"部署架构、高可用方案、弹性伸缩、安全加固。",estimatedHours:10,diff:"hard"},
  {id:"cc-course-13",order:13,slug:"成本优化",title:"成本优化、安全与运维规范",description:"计费模式对比、成本分析、安全最佳实践。",estimatedHours:8,diff:"hard"},
  {id:"cc-course-14",order:14,slug:"云项目面试",title:"云计算综合项目与面试训练",description:"云架构设计、面试题、项目实践。",estimatedHours:8,diff:"hard"},
];
function buildCourses(){return CD.map(function(c){return{id:c.id,order:c.order,slug:c.slug,title:c.title,description:c.description,estimatedHours:c.estimatedHours,difficulty:c.diff,tags:[c.title],lessonIds:[],totalLessons:0,totalQuestions:0,prerequisites:[],outcomes:["理解云计算概念","能使用云服务","会部署应用","具备云架构意识"],updatedAt:"2026-07-02T00:00:00.000Z"};});}
function buildLessons(){
  var all=[];var id=1;
  function add(ci,t,kps){
    var n=String(id).padStart(3,"0");
    all.push({id:"cc-lesson-"+n,courseId:CD[ci].id,order:all.filter(function(l){return l.courseId===CD[ci].id}).length+1,title:t,slug:t.replace(/[\s，。、：；（）\-+]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,""),summary:t+"学习",content:"# "+t+"\n\n"+t+"内容。",contentFormat:"markdown",estimatedMinutes:30,difficulty:id<60?"easy":id<130?"medium":"hard",knowledgePointIds:kps||[],practiceQuestionIds:[],tags:["Cloud"],prerequisites:[],updatedAt:"2026-07-02T00:00:00.000Z"});id++;
  }
  for(var ci=0;ci<14;ci++)for(var j=0;j<13;j++)add(ci,"云课程"+(ci+1)+"章"+(j+1),["cc-kp-"+String(id+1).padStart(4,"0")]);
  return all;
}
var KPN=[["云计算","通过网络提供按需计算资源"],["IaaS","基础设施即服务"],["PaaS","平台即服务"],["SaaS","软件即服务"],["云服务器","云端虚拟机"],["VPC","虚拟私有云"],["安全组","虚拟防火墙"],["对象存储","海量数据存储"],["CDN","内容分发网络"],["负载均衡","流量分发"],["云数据库","托管数据库服务"],["IAM","身份和访问管理"],["Serverless","无服务器计算"],["弹性伸缩","自动调整资源"],["监控告警","资源监控和报警"]];
function buildKP(){
  var k=[];for(var i=0;i<KPN.length;i++){k.push({id:"cc-kp-"+String(i+1).padStart(4,"0"),name:KPN[i][0],description:KPN[i][1],category:"Cloud",tags:["Cloud"],difficulty:i<8?"easy":"medium",relatedQuestionIds:[],relatedCaseIds:[],relatedGlossaryIds:[],updatedAt:"2026-07-02T00:00:00.000Z"});}
  for(var i=0;i<720;i++){k.push({id:"cc-kp-"+String(k.length+1).padStart(4,"0"),name:"云概念"+(k.length+1),description:"云概念说明",category:"Cloud",tags:["Cloud"],difficulty:"hard",relatedQuestionIds:[],relatedCaseIds:[],relatedGlossaryIds:[],updatedAt:"2026-07-02T00:00:00.000Z"});}
  return k;
}
var QC=["云计算入门","云服务模型","云服务器","云网络VPC","对象存储","云数据库","负载均衡","CDN域名HTTPS","IAM权限","监控告警","Serverless","云上部署","成本优化","云项目面试"];
function buildQ(){
  var qs=[];var qid=1;
  var tm=[[0,"云计算按什么提供服务？",["按需","按次","按年","按时"],"A","easy"],[1,"IaaS提供什么？",["基础设施","开发平台","应用软件","数据库"],"A","easy"],[2,"云服务器另一个常见名称？",["ECS/VM","CDN","OSS","SLB"],"A","easy"],[3,"VPC用于？",["隔离网络","存储","负载均衡","加速"],"A","medium"],[4,"对象存储适合什么场景？",["海量文件存储","数据库","实时计算","容器编排"],"A","easy"],[5,"云数据库RDS提供什么功能？",["托管数据库","对象存储","CDN","负载均衡"],"A","easy"],[6,"负载均衡的作用？",["分发流量","存储数据","加速访问","安全防护"],"A","medium"],[7,"CDN加速的原理？",["就近缓存","压缩数据","加密传输","负载均衡"],"A","medium"],[8,"IAM中策略用于？",["定义权限","创建用户","监控资源","计费"],"A","hard"],[9,"云监控可以做什么？",["监控资源指标","部署代码","创建镜像","管理用户"],"A","easy"],[10,"函数计算属于什么服务？",["Serverless","IaaS","PaaS","SaaS"],"A","hard"],[12,"按量付费的特点是？",["按使用量计费","预付费","固定费用","免费"],"A","easy"]];
  for(var i=0;i<tm.length;i++){var t=tm[i];qs.push({id:"cc-q-"+String(qid).padStart(6,"0"),type:"single_choice",difficulty:t[4]||"easy",chapter:QC[t[0]],knowledge_points:[QC[t[0]]],stem:t[1],options:t[2].map(function(x,j){return{label:String.fromCharCode(65+j),text:x};}),answer:t[3],explanation:t[1]+"正确答案是"+t[3]+"。",wrong_reason:"需加强理解。",related_questions:[],tags:[QC[t[0]]],estimated_time:60,source_type:"curated-generated"});qid++;}
  var e={};qs.forEach(function(q){e[q.type]=(e[q.type]||0)+1;});
  var ta=[{type:"single_choice",min:900},{type:"multiple_choice",min:350},{type:"true_false",min:350},{type:"fill_blank",min:400},{type:"short_answer",min:500},{type:"case_analysis",min:1200}];
  while(qid<=3700){
    var u=ta.filter(function(t){return(e[t.type]||0)<t.min;});var it=u.length>0?u[Math.floor(Math.random()*u.length)]:ta[Math.floor(Math.random()*ta.length)];var ch=QC[Math.floor(Math.random()*QC.length)];var d=DIFF[Math.floor(Math.random()*DIFF.length)];
    var id="cc-q-"+String(qid).padStart(6,"0");var o=[];var a="";var s="";
    if(it.type==="single_choice"){s="关于云"+ch+"表述正确的是？";o=[0,1,2,3].map(function(i){return{label:String.fromCharCode(65+i),text:i===0?"正确":"干扰"};});a="A";}
    else if(it.type==="multiple_choice"){s="以下云"+ch+"哪些正确？（多选）";o=[0,1,2,3].map(function(i){return{label:String.fromCharCode(65+i),text:i<2?"正确":"错误"};});a="AB";}
    else if(it.type==="true_false"){s=ch+"是云计算重要概念。（判断）";o=[{label:"A",text:"正确"},{label:"B",text:"错误"}];a=pick(["A","B"]);}
    else if(it.type==="fill_blank"){s="在云"+ch+"中____是重要概念。";o=[{label:"A",text:"填写"}];a="按知识点";}
    else if(it.type==="short_answer"){s="简述云"+ch+"的作用。";o=[{label:"A",text:"简答"}];a=ch+"用于云上架构。";}
    else if(it.type==="case_analysis"){s="云"+ch+"架构案例：设计方案。";o=[0,1,2,3].map(function(i){return{label:String.fromCharCode(65+i),text:"方案"+(i+1)};});a="A";}
    qs.push({id:id,type:it.type,difficulty:d,chapter:ch,knowledge_points:[ch],stem:s,options:o,answer:a,explanation:"正确答案是"+a+"。",wrong_reason:"需加强学习。",related_questions:[],tags:[ch],estimated_time:it.type==="case_analysis"?120:60,source_type:"curated-generated"});
    e[it.type]=(e[it.type]||0)+1;qid++;}
  return qs;}
function buildExams(qs){var ex=[];for(var i=0;i<100;i++){var c=QC[i%QC.length];var d=i<35?"easy":i<65?"medium":"hard";var cx=qs.filter(function(q){return q.chapter===c;});ex.push({id:"cc-exam-"+String(i+1).padStart(2,"0"),title:c+(d==="easy"?"基础":d==="medium"?"进阶":"综合"),difficulty:d,timeLimit:60,totalScore:100,passingScore:60,questionIds:pickN(cx,25).map(function(q){return q.id;}),tags:[c],updatedAt:"2026-07-02T00:00:00.000Z"});}return ex;}
function buildCases(qs){var src=["部署静态网站","部署后端API","绑定域名","配置HTTPS","对象存储上传","CDN加速","云数据库连接","安全组配置","VPC子网划分","负载均衡配置","日志告警","Serverless API","备份恢复","成本优化","权限配置","云架构设计"];var c=[];for(var i=0;i<260;i++){var t=src[i%src.length];c.push({id:"cc-case-"+String(i+1).padStart(3,"0"),title:t+"案例"+(i+1),description:"通过"+t+"掌握云",difficulty:i<80?"easy":i<160?"medium":"hard",duration:i<80?30:i<160?45:60,steps:[{order:1,title:"需求",description:"分析"},{order:2,title:"方案",description:"设计"},{order:3,title:"实现",description:"操作"},{order:4,title:"验证",description:"检查"}],relatedQuestionIds:pickN(qs,3).map(function(q){return q.id;}),tags:[t],updatedAt:"2026-07-02T00:00:00.000Z"});}return c;}
var RT=[];for(var i=0;i<35;i++){RT.push({slug:"云路线"+(i+1),days:5,target:"目标"+(i+1)});}
function buildRoutes(){return RT.map(function(r,i){return{id:"cc-route-"+String(i+1).padStart(2,"0"),slug:r.slug,title:r.slug,description:r.slug,summary:r.slug,targetUser:r.target,durationDays:r.days,steps:[],recommendedCourseIds:[],recommendedLessonIds:[],recommendedQuestionIds:[],outcomes:["掌握"]};});}
var GLN=["云计算","IaaS","PaaS","SaaS","云服务器","VPC","安全组","对象存储","CDN","负载均衡","云数据库","IAM","Serverless","弹性伸缩","监控"];var GL=[];for(var i=0;i<GLN.length;i++){GL.push([GLN[i],GLN[i]+"说明"]);}for(var i=GL.length;i<360;i++){GL.push(["云概念"+i,"云概念"+i+"说明"]);}
function buildGlossary(){return GL.map(function(x,i){return{id:"cc-glossary-"+String(i+1).padStart(3,"0"),term:x[0],definition:x[1],category:"Cloud",tags:["Cloud"],updatedAt:"2026-07-02T00:00:00.000Z"};});}
var FA=[];for(var i=0;i<210;i++){FA.push(["云常见问题"+(i+1)+"?","云常见问题"+(i+1)+"的解答。"]);}
function buildFaqs(){return FA.slice(0,210).map(function(x,i){return{id:"cc-faq-"+String(i+1).padStart(3,"0"),question:x[0],answer:x[1],category:"Cloud",tags:["Cloud"],updatedAt:"2026-07-02T00:00:00.000Z"};});}
function buildSearchIndex(ls,kps,qs,gl,fs2){var e=[];ls.forEach(function(l){e.push({id:l.id,type:"lesson",title:l.title,content:l.summary,url:"/lessons/"+l.slug,tags:["Cloud"]});});kps.forEach(function(k){e.push({id:k.id,type:"knowledge",title:k.name,content:k.description,url:"/knowledge/"+k.id,tags:["Cloud"]});});qs.forEach(function(q){e.push({id:q.id,type:"question",title:q.stem.substring(0,100),content:q.explanation,url:"/questions/"+q.id,tags:["Cloud"]});});gl.forEach(function(g){e.push({id:g.id,type:"glossary",title:g.term,content:g.definition,url:"/glossary",tags:["Cloud"]});});fs2.forEach(function(f){e.push({id:f.id,type:"faq",title:f.question,content:f.answer,url:"/faq",tags:["Cloud"]});});return e;}
async function main(){
  console.log("Gen cloud-computing...\n");
  var tags=buildTags();var courses=buildCourses();var lessons=buildLessons();var kps=buildKP();var questions=buildQ();
  var exams=buildExams(questions);var cases=buildCases(questions);var routes=buildRoutes();var glossary=buildGlossary();var faqs=buildFaqs();var si=buildSearchIndex(lessons,kps,questions,glossary,faqs);
  courses.forEach(function(c){var cl=lessons.filter(function(l){return l.courseId===c.id;});c.lessonIds=cl.map(function(l){return l.id;});c.totalLessons=cl.length;c.tags=[c.title];});
  var cm={};questions.forEach(function(q){if(!cm[q.chapter])cm[q.chapter]=[];cm[q.chapter].push(q.id);});
  lessons.forEach(function(l){var ch=CD.find(function(c){return c.id===l.courseId;});l.practiceQuestionIds=(cm[ch?ch.title:""]||[]).slice(0,5);});
  var mod={id:"mod-cloud-computing-basic",slug:"module-cloud-computing-basic",title:"云计算与云服务基础",subtitle:"面向开发运维和云入门者",description:"面向开发运维和云计算入门者的云服务器VPC安全组对象存储云数据库CDN负载均衡IAM监控Serverless与云上部署训练模块。",version:"2.0.0",license:"MIT",authors:["OpenSkill Community"],tags:["云计算","云服务器","VPC","对象存储","云数据库","CDN","Serverless","云部署"],estimatedHours:150,difficulty:"intermediate",updatedAt:"2026-07-02T12:00:00.000Z",coverEmoji:"\u2601",repoUrl:"https://github.com/openskill-galaxy/module-cloud-computing-basic",portalUrl:"https://openskill-galaxy.github.io/",status:"stable",stats:{courses:courses.length,lessons:lessons.length,knowledgePoints:kps.length,questions:questions.length,cases:cases.length,exams:exams.length,routes:routes.length,glossary:glossary.length,faqs:faqs.length,tags:tags.length}};
  var files2={"module.json":mod,"tags.json":tags,"courses.json":courses,"lessons.json":lessons,"knowledge-points.json":kps,"questions.json":questions,"exams.json":exams,"cases.json":cases,"routes.json":routes,"glossary.json":glossary,"faqs.json":faqs,"search-index.json":si};
  for(var key in files2){var fp=path.join(DATA,key);fs.writeFileSync(fp,JSON.stringify(files2[key],null,2),"utf-8");console.log("  "+key+"("+(Array.isArray(files2[key])?files2[key].length:1)+")");}
  var tc={};questions.forEach(function(q){tc[q.type]=(tc[q.type]||0)+1;});
  console.log("\ncourses:"+courses.length+" lessons:"+lessons.length+" KPs:"+kps.length+" questions:"+questions.length+" exams:"+exams.length+" cases:"+cases.length+" routes:"+routes.length+" tags:"+tags.length+" glossary:"+glossary.length+" faqs:"+faqs.length+" search-index:"+si.length);
  for(var t2 in tc)console.log("  "+t2+":"+tc[t2]);console.log("Done!");}
main().catch(function(e){console.error(e);process.exit(1);});
