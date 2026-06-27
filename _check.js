
// ============================================================
//  DATA: 天干地支 & 五行基础
// ============================================================
const STEMS = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const WX = { '甲':'木','乙':'木','丙':'火','丁':'火','戊':'土','己':'土','庚':'金','辛':'金','壬':'水','癸':'水' };
const WX_BR = { '子':'水','丑':'土','寅':'木','卯':'木','辰':'土','巳':'火','午':'火','未':'土','申':'金','酉':'金','戌':'土','亥':'水' };
const HIDDEN = { '子':['癸'],'丑':['己','癸','辛'],'寅':['甲','丙','戊'],'卯':['乙'],'辰':['戊','乙','癸'],'巳':['丙','戊','庚'],'午':['丁','己'],'未':['己','丁','乙'],'申':['庚','壬','戊'],'酉':['辛'],'戌':['戊','辛','丁'],'亥':['壬','甲'] };
const ZODIAC = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
const YY = { '甲':'阳','乙':'阴','丙':'阳','丁':'阴','戊':'阳','己':'阴','庚':'阳','辛':'阴','壬':'阳','癸':'阴' };
const SHENG = { '木':'火','火':'土','土':'金','金':'水','水':'木' };
const KE = { '木':'土','土':'水','水':'火','火':'金','金':'木' };
const WX_LIST = ['金','木','水','火','土'];
const SHICHEN = [
  { n:'子时 23-01', b:'子', h:0 },{ n:'丑时 01-03', b:'丑', h:1 },{ n:'寅时 03-05', b:'寅', h:2 },
  { n:'卯时 05-07', b:'卯', h:3 },{ n:'辰时 07-09', b:'辰', h:4 },{ n:'巳时 09-11', b:'巳', h:5 },
  { n:'午时 11-13', b:'午', h:6 },{ n:'未时 13-15', b:'未', h:7 },{ n:'申时 15-17', b:'申', h:8 },
  { n:'酉时 17-19', b:'酉', h:9 },{ n:'戌时 19-21', b:'戌', h:10 },{ n:'亥时 21-23', b:'亥', h:11 }
];

// 节气日 (月, 日) — 用于月柱
const JQ = [[1,6],[2,4],[3,6],[4,5],[5,6],[6,6],[7,7],[8,8],[9,8],[10,8],[11,7],[12,7]];
// 五鼠遁: 日干 → 子时天干index
const WSD = { '甲':0,'己':0,'乙':2,'庚':2,'丙':4,'辛':4,'丁':6,'壬':6,'戊':8,'癸':8 };

// ============================================================
//  省份 & 地区 & 门类数据
// ============================================================
const PROVINCES = ['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','广西','海南','重庆','四川','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆'];
const REGIONS = [
  { v:'east', n:'东部（沪苏浙）', wx:'木', desc:'上海/南京/杭州·木旺之地' },
  { v:'south', n:'南部（粤闽琼）', wx:'火', desc:'广州/深圳/厦门·火旺之地' },
  { v:'west', n:'西部（川渝陕）', wx:'金', desc:'成都/重庆/西安·金旺之地' },
  { v:'north', n:'北部（京津冀辽）', wx:'水', desc:'北京/天津/大连·水旺之地' },
  { v:'center', n:'中部（鄂豫湘）', wx:'土', desc:'武汉/郑州/长沙·土旺之地' },
];
const CATEGORIES = [
  { v:'philosophy', n:'哲学', wx:'水' },{ v:'economics', n:'经济学', wx:'金' },{ v:'law', n:'法学', wx:'金' },
  { v:'education', n:'教育学', wx:'木' },{ v:'literature', n:'文学', wx:'木+水' },{ v:'history', n:'历史学', wx:'水' },
  { v:'science', n:'理学', wx:'金+水' },{ v:'engineering', n:'工学', wx:'火+土' },{ v:'agriculture', n:'农学', wx:'木' },
  { v:'medicine', n:'医学', wx:'木+土' },{ v:'management', n:'管理学', wx:'土+金' },{ v:'art', n:'艺术学', wx:'火' },
];

// ============================================================
//  完整专业数据库 (200+ entries)
// ============================================================
const MAJORS = [
  // === 金 ===
  { n:'金融学', c:'经济学', l:'本科', w:'金', r:'金主精密规则，正财/正官格绝配，逻辑严密者天生适合', h:5 },
  { n:'金融工程', c:'经济学', l:'本科', w:'金', r:'金主义理，量化金融需要极强的数理逻辑', h:5 },
  { n:'会计学', c:'管理学', l:'本科', w:'金', r:'金主计算，正财格首选，精打细算天赋', h:5 },
  { n:'财务管理', c:'管理学', l:'本科', w:'金', r:'金主财富管理，偏财格佳配', h:4 },
  { n:'审计学', c:'管理学', l:'本科', w:'金', r:'金主义刑，正官格适合审计监察', h:4 },
  { n:'法学', c:'法学', l:'本科', w:'金', r:'金主规则法度，正官格天然匹配', h:5 },
  { n:'知识产权', c:'法学', l:'本科', w:'金', r:'金主精密规则，知产保护需要严谨思维', h:4 },
  { n:'计算机科学与技术', c:'工学', l:'本科', w:'金', r:'金主逻辑，编程即结构化思维的极致体现', h:5 },
  { n:'软件工程', c:'工学', l:'本科', w:'金', r:'金主义理，代码即规则，伤官生财佳配', h:5 },
  { n:'信息安全', c:'工学', l:'本科', w:'金', r:'金主防御，七杀有制者适合安全攻防', h:4 },
  { n:'数据科学与大数据技术', c:'工学', l:'本科', w:'金', r:'金+水格局，数据分析需要精密逻辑', h:5 },
  { n:'统计学', c:'理学', l:'本科', w:'金', r:'金主精密度量，统计需要极强的数字敏感度', h:4 },
  { n:'精算学', c:'经济学', l:'本科', w:'金', r:'强金专业，精算师对数学要求极高', h:4 },
  { n:'经济学', c:'经济学', l:'本科', w:'金', r:'金主义利，经济分析需要逻辑框架', h:4 },
  { n:'数学与应用数学', c:'理学', l:'本科', w:'金', r:'金为数学之本，偏印格适合纯数', h:4 },
  { n:'大数据与会计', c:'财经商贸', l:'专科', w:'金', r:'金主财务，会计信息化方向', h:5 },
  { n:'软件技术', c:'电子信息', l:'专科', w:'金', r:'金主义理，编程技能型人才', h:5 },
  { n:'计算机网络技术', c:'电子信息', l:'专科', w:'金', r:'金主逻辑架构，网络工程方向', h:4 },
  { n:'法律事务', c:'公安司法', l:'专科', w:'金', r:'金主义刑，法律辅助类岗位', h:4 },
  { n:'数控技术', c:'装备制造', l:'专科', w:'金', r:'金主精密制造，数控加工方向', h:4 },
  { n:'工业机器人技术', c:'装备制造', l:'专科', w:'金', r:'金主义理+火之创新', h:4 },

  // === 木 ===
  { n:'教育学', c:'教育学', l:'本科', w:'木', r:'木主生长教育，正印格天然匹配', h:5 },
  { n:'学前教育', c:'教育学', l:'本科', w:'木', r:'木主生发，幼儿教育需要爱心与耐心', h:4 },
  { n:'特殊教育', c:'教育学', l:'本科', w:'木', r:'木主仁爱，特殊教育需要极大的包容心', h:3 },
  { n:'汉语言文学', c:'文学', l:'本科', w:'木', r:'木主文华，正印格中文天赋', h:5 },
  { n:'汉语国际教育', c:'文学', l:'本科', w:'木', r:'木主传播+水之语言，跨文化交流', h:4 },
  { n:'新闻学', c:'文学', l:'本科', w:'木', r:'木主传播，食伤旺者适合新闻', h:4 },
  { n:'网络与新媒体', c:'文学', l:'本科', w:'木', r:'木主传播+火之新媒体技术', h:5 },
  { n:'中医学', c:'医学', l:'本科', w:'木', r:'木主生发，医者仁心，偏印格佳', h:5 },
  { n:'针灸推拿学', c:'医学', l:'本科', w:'木', r:'木通经络，针灸为木之技艺', h:4 },
  { n:'中药学', c:'医学', l:'本科', w:'木', r:'木主药性，中药为草木之精', h:4 },
  { n:'护理学', c:'医学', l:'本科', w:'木', r:'木主仁爱护理，食神格适合', h:4 },
  { n:'药学', c:'医学', l:'本科', w:'木', r:'木通药性，药物研发需要耐心', h:4 },
  { n:'心理学', c:'理学', l:'本科', w:'木', r:'木主疏导，印星+食神适合心理咨询', h:5 },
  { n:'生物科学', c:'理学', l:'本科', w:'木', r:'木主生命科学，探究生命本质', h:4 },
  { n:'农学', c:'农学', l:'本科', w:'木', r:'木主农业，接天地之气', h:4 },
  { n:'园林', c:'农学', l:'本科', w:'木', r:'木主园艺，创造绿色空间', h:4 },
  { n:'广告学', c:'文学', l:'本科', w:'木', r:'木主传播+火之创意，广告策划', h:4 },
  { n:'小学教育', c:'教育与体育', l:'专科', w:'木', r:'木主教化，基础教育方向', h:5 },
  { n:'护理', c:'医药卫生', l:'专科', w:'木', r:'木主仁爱，临床护理方向', h:5 },
  { n:'中医学（专科）', c:'医药卫生', l:'专科', w:'木', r:'木主中医，基层医疗人才', h:4 },
  { n:'园林技术', c:'农林牧渔', l:'专科', w:'木', r:'木主园艺，园林施工养护', h:4 },
  { n:'畜牧兽医', c:'农林牧渔', l:'专科', w:'木', r:'木主动物生命，兽医方向', h:4 },

  // === 水 ===
  { n:'英语', c:'文学', l:'本科', w:'水', r:'水主流通，外语天赋', h:5 },
  { n:'翻译', c:'文学', l:'本科', w:'水', r:'水主变通，语言转换的艺术', h:5 },
  { n:'日语', c:'文学', l:'本科', w:'水', r:'水主东方智慧，日语为水木交融', h:4 },
  { n:'哲学', c:'哲学', l:'本科', w:'水', r:'水主智慧深远，偏印格最佳', h:4 },
  { n:'历史学', c:'历史学', l:'本科', w:'水', r:'水主深远流长，探究本源', h:3 },
  { n:'考古学', c:'历史学', l:'本科', w:'水', r:'水主深藏，发掘历史', h:3 },
  { n:'水利水电工程', c:'工学', l:'本科', w:'水', r:'水归水业，自然匹配', h:4 },
  { n:'水文与水资源工程', c:'工学', l:'本科', w:'水', r:'水主水资源管理', h:4 },
  { n:'环境工程', c:'工学', l:'本科', w:'水', r:'水主环境治理，净化天赋', h:4 },
  { n:'物流管理', c:'管理学', l:'本科', w:'水', r:'水主流动，供应链即物流的艺术', h:4 },
  { n:'旅游管理', c:'管理学', l:'本科', w:'水', r:'水主行旅，涉外旅游佳', h:4 },
  { n:'酒店管理', c:'管理学', l:'本科', w:'水', r:'水主服务流通，酒店运营', h:3 },
  { n:'行政管理', c:'管理学', l:'本科', w:'水', r:'水主变通灵活，公共事务管理', h:4 },
  { n:'社会学', c:'法学', l:'本科', w:'水', r:'水主洞察，社会分析', h:4 },
  { n:'国际政治', c:'法学', l:'本科', w:'水', r:'水主国际流动，外交天赋', h:4 },
  { n:'地理科学', c:'理学', l:'本科', w:'水', r:'水主地理，山川河流', h:3 },
  { n:'水利工程', c:'水利', l:'专科', w:'水', r:'水归水业，水利设施方向', h:5 },
  { n:'旅游管理（专科）', c:'旅游', l:'专科', w:'水', r:'水主行旅，导游/酒店方向', h:4 },
  { n:'现代物流管理', c:'财经商贸', l:'专科', w:'水', r:'水主流通，快递物流方向', h:4 },
  { n:'社会工作', c:'公共管理', l:'专科', w:'水', r:'水主关怀流动，社区服务', h:4 },
  { n:'商务英语', c:'教育与体育', l:'专科', w:'水', r:'水主语言，商务沟通', h:4 },

  // === 火 ===
  { n:'电子信息工程', c:'工学', l:'本科', w:'火', r:'火主电子科技，伤官格最佳', h:5 },
  { n:'通信工程', c:'工学', l:'本科', w:'火', r:'火主信息传递，通讯天赋', h:5 },
  { n:'人工智能', c:'工学', l:'本科', w:'火', r:'火主智能+金之算法，前沿方向', h:5 },
  { n:'电气工程及其自动化', c:'工学', l:'本科', w:'火', r:'火主电力，能源热情', h:5 },
  { n:'自动化', c:'工学', l:'本科', w:'火', r:'火主动力控制，自动化天赋', h:4 },
  { n:'能源与动力工程', c:'工学', l:'本科', w:'火', r:'火主能源动力，驱动世界', h:4 },
  { n:'新能源科学与工程', c:'工学', l:'本科', w:'火', r:'火主新能源，光伏/风电/储能', h:5 },
  { n:'表演', c:'艺术学', l:'本科', w:'火', r:'火主表现，食伤透干者天生演员', h:5 },
  { n:'播音与主持艺术', c:'艺术学', l:'本科', w:'火', r:'火主声音表达，感染力的艺术', h:5 },
  { n:'数字媒体艺术', c:'艺术学', l:'本科', w:'火', r:'火主创意+金之技术，数媒绝配', h:5 },
  { n:'视觉传达设计', c:'艺术学', l:'本科', w:'火', r:'火主视觉创意，设计天赋', h:4 },
  { n:'广播电视编导', c:'艺术学', l:'本科', w:'火', r:'火主创意导演，编导天赋', h:4 },
  { n:'动画', c:'艺术学', l:'本科', w:'火', r:'火主动画创意，赋予生命', h:4 },
  { n:'微电子科学与工程', c:'工学', l:'本科', w:'火', r:'火主芯片，集成电路国之重器', h:5 },
  { n:'航空航天工程', c:'工学', l:'本科', w:'火', r:'火主凌云之志，飞天梦想', h:4 },
  { n:'集成电路设计与集成系统', c:'工学', l:'本科', w:'火', r:'火+金交融，芯片设计', h:5 },
  { n:'机器人工程', c:'工学', l:'本科', w:'火', r:'火主智能机器，机器人时代', h:5 },
  { n:'电力系统自动化技术', c:'能源动力', l:'专科', w:'火', r:'火主电力，电网运行维护', h:5 },
  { n:'新能源汽车技术', c:'装备制造', l:'专科', w:'火', r:'火主新能源，电动车方向', h:5 },
  { n:'数字媒体艺术设计', c:'文化艺术', l:'专科', w:'火', r:'火主创意设计，数字媒体', h:5 },
  { n:'视觉传达设计（专科）', c:'文化艺术', l:'专科', w:'火', r:'火主视觉，广告/UI设计', h:4 },
  { n:'无人机应用技术', c:'装备制造', l:'专科', w:'火', r:'火主飞行，无人机操控', h:4 },

  // === 土 ===
  { n:'土木工程', c:'工学', l:'本科', w:'土', r:'土主建筑承载，比肩格实干', h:5 },
  { n:'建筑学', c:'工学', l:'本科', w:'土', r:'土主空间设计，建筑师的土壤', h:5 },
  { n:'城乡规划', c:'工学', l:'本科', w:'土', r:'土主土地规划，城市设计', h:4 },
  { n:'临床医学', c:'医学', l:'本科', w:'土', r:'土主务实，大医精诚', h:5 },
  { n:'口腔医学', c:'医学', l:'本科', w:'土', r:'土主手艺精巧，口腔为精细手艺', h:5 },
  { n:'麻醉学', c:'医学', l:'本科', w:'土', r:'土主沉稳，麻醉需要极大定力', h:4 },
  { n:'医学影像学', c:'医学', l:'本科', w:'土', r:'土+金，影像诊断', h:4 },
  { n:'预防医学', c:'医学', l:'本科', w:'土', r:'土主公共卫生，防患未然', h:4 },
  { n:'工商管理', c:'管理学', l:'本科', w:'土', r:'土主组织管理，比劫格佳', h:4 },
  { n:'人力资源管理', c:'管理学', l:'本科', w:'土', r:'土主承载人才，HR天赋', h:4 },
  { n:'市场营销', c:'管理学', l:'本科', w:'土', r:'土主市场承载+火之传播', h:4 },
  { n:'会计学（管理方向）', c:'管理学', l:'本科', w:'土', r:'土+金，管理会计', h:4 },
  { n:'材料科学与工程', c:'工学', l:'本科', w:'土', r:'土为物质基础，材料科学', h:4 },
  { n:'测绘工程', c:'工学', l:'本科', w:'土', r:'土主大地测量', h:3 },
  { n:'地质工程', c:'工学', l:'本科', w:'土', r:'土主地质勘探', h:3 },
  { n:'工程造价', c:'管理学', l:'本科', w:'土', r:'土主建筑成本，造价师方向', h:5 },
  { n:'食品科学与工程', c:'工学', l:'本科', w:'土', r:'土主食物，从土地到餐桌', h:4 },
  { n:'建筑工程技术', c:'土木建筑', l:'专科', w:'土', r:'土主建筑施工，一线技术', h:5 },
  { n:'工程造价（专科）', c:'土木建筑', l:'专科', w:'土', r:'土主造价，预算方向', h:5 },
  { n:'临床医学（专科）', c:'医药卫生', l:'专科', w:'土', r:'土主务实，基层医疗', h:5 },
  { n:'口腔医学（专科）', c:'医药卫生', l:'专科', w:'土', r:'土主手艺，口腔技术', h:5 },
  { n:'康复治疗技术', c:'医药卫生', l:'专科', w:'土', r:'土主康复调理，治疗师方向', h:4 },
  { n:'医学检验技术', c:'医药卫生', l:'专科', w:'土', r:'土+金，检验方向', h:4 },
  { n:'安全技术与管理', c:'资源环境', l:'专科', w:'土', r:'土主安全稳定，安管方向', h:4 },

  // === 交叉/混合 ===
  { n:'金融科技', c:'经济学', l:'本科', w:'金+水', r:'金（金融）+ 水（科技流通），新兴交叉', h:5 },
  { n:'数字经济', c:'经济学', l:'本科', w:'金+水', r:'金（经济）+ 水（数字流动）', h:5 },
  { n:'智能科学与技术', c:'工学', l:'本科', w:'金+火', r:'金（算法）+ 火（智能）', h:5 },
  { n:'生物医学工程', c:'工学', l:'本科', w:'木+土', r:'木（生命）+ 土（器械）', h:4 },
  { n:'环境设计', c:'艺术学', l:'本科', w:'水+土', r:'水（环境）+ 土（空间设计）', h:4 },
  { n:'电子商务', c:'财经商贸', l:'专科', w:'金+火', r:'金（商务）+ 火（互联网）', h:4 },
];

// ============================================================
//  INIT: populate form options
// ============================================================
(function init() {
  const tSel = document.getElementById('birthTime');
  SHICHEN.forEach((s,i) => { const o = document.createElement('option'); o.value = i; o.textContent = s.n; if (i===5) o.selected = true; tSel.appendChild(o); });
  const pSel = document.getElementById('province');
  PROVINCES.forEach(p => { const o = document.createElement('option'); o.value = p; o.textContent = p; pSel.appendChild(o); });
  const rSel = document.getElementById('preferRegion');
  REGIONS.forEach(r => { const o = document.createElement('option'); o.value = r.v; o.textContent = r.n; rSel.appendChild(o); });
  const cSel = document.getElementById('preferCategory');
  CATEGORIES.forEach(c => { const o = document.createElement('option'); o.value = c.v; o.textContent = c.n; cSel.appendChild(o); });
  renderBrowseTable(); // pre-render browse
})();

// ============================================================
//  BA ZI ENGINE
// ============================================================
function yearPillar(date) {
  const y = date.getFullYear();
  const isBeforeLC = (date.getMonth() < 1) || (date.getMonth() === 1 && date.getDate() < 4);
  const ey = isBeforeLC ? y - 1 : y;
  const si = ((ey - 4) % 10 + 10) % 10;
  const bi = ((ey - 4) % 12 + 12) % 12;
  return { stem:STEMS[si], branch:BRANCHES[bi], zodiac:ZODIAC[bi], year:ey };
}

function monthPillar(date) {
  const m = date.getMonth(), d = date.getDate();
  const jqDays = [6,4,6,5,6,6,7,8,8,8,7,7];
  let mn; // 寅=1
  if (m === 0) mn = (d >= jqDays[0]) ? 12 : 11;
  else if (m < 11) mn = (d >= jqDays[m]) ? m + 1 : m;
  else mn = (d >= jqDays[11]) ? 12 : 11;
  mn = ((mn - 1 + 12) % 12);
  const branch = BRANCHES[mn];
  const yp = yearPillar(date);
  const ysi = STEMS.indexOf(yp.stem);
  const base = [2,4,6,8,0][Math.floor(ysi / 2) % 5];
  const stem = STEMS[(base + mn) % 10];
  return { stem, branch };
}

function dayPillar(date) {
  const y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate();
  const a = Math.floor((14 - m) / 12);
  const yr = y + 4800 - a;
  const mo = m + 12 * a - 3;
  const jdn = d + Math.floor((153 * mo + 2) / 5) + 365 * yr + Math.floor(yr / 4) - Math.floor(yr / 100) + Math.floor(yr / 400) - 32045;
  // 1900-01-01 JDN=2415021, index 10 (甲戌)
  const idx = ((jdn - 2415021 + 10) % 60 + 60) % 60;
  return { stem:STEMS[idx % 10], branch:BRANCHES[idx % 12], idx };
}

function hourPillar(dayStem, hIdx) {
  const branch = BRANCHES[hIdx];
  const base = WSD[dayStem];
  const stem = STEMS[(base + hIdx) % 10];
  return { stem, branch };
}

function wuxingCounts(stems, branches) {
  const c = { '金':0,'木':0,'水':0,'火':0,'土':0 };
  stems.forEach(s => { if (WX[s]) c[WX[s]]++; });
  branches.forEach(b => { (HIDDEN[b]||[]).forEach(h => { if (WX[h]) c[WX[h]]++; }); });
  return c;
}

function judgeStrength(dayWx, monthBr, wc) {
  const mWx = WX_BR[monthBr];
  let score = 0;
  if (mWx === dayWx) score += 3;
  else if (SHENG[mWx] === dayWx) score += 1;
  else if (SHENG[dayWx] === mWx) score -= 2;
  else if (KE[dayWx] === mWx) score -= 1;
  else score -= 3;
  const sup = (wc[dayWx]||0) + (wc[Object.keys(SHENG).find(k => SHENG[k]===dayWx)||'']||0);
  if (sup >= 5) score += 2; else if (sup >= 3) score += 1; else if (sup <= 1) score -= 1;
  if (score >= 4) return '极强'; if (score >= 2) return '偏强'; if (score >= -1) return '中和'; if (score >= -3) return '偏弱';
  return '极弱';
}

function yongJi(dayWx, strength, monthBr) {
  const all = ['金','木','水','火','土'];
  let yong = [], ji = [], reason = '';
  if (strength === '极强') {
    yong = [KE[dayWx], SHENG[dayWx]].filter(Boolean);
    ji = [dayWx, ...all.filter(w => SHENG[w] === dayWx)];
    reason = '身强需克泄耗';
  } else if (strength === '偏强') {
    yong = [KE[dayWx], SHENG[dayWx]].filter(Boolean);
    ji = [dayWx, ...all.filter(w => SHENG[w] === dayWx)];
    reason = '身偏强，以克泄为主';
  } else if (strength === '偏弱') {
    yong = [dayWx, ...all.filter(w => SHENG[w] === dayWx)];
    ji = [KE[dayWx], SHENG[dayWx]].filter(Boolean);
    reason = '身偏弱，以生扶为主';
  } else if (strength === '极弱') {
    yong = [dayWx, ...all.filter(w => SHENG[w] === dayWx)];
    ji = [KE[dayWx], SHENG[dayWx]].filter(Boolean);
    reason = '身极弱需生扶，或从格';
  } else {
    yong = [...all]; ji = []; reason = '中和，通关调和为主';
  }
  yong = [...new Set(yong)]; ji = [...new Set(ji)];
  // 调候
  const summer = ['巳','午','未'], winter = ['亥','子','丑'];
  if (summer.includes(monthBr) && !yong.includes('水')) { yong.unshift('水'); reason += '；夏月需水调候'; }
  if (winter.includes(monthBr) && !yong.includes('火')) { yong.unshift('火'); reason += '；冬月需火暖局'; }
  return { yong, ji, reason };
}

function shiShen(dayStem, otherStem) {
  const di = STEMS.indexOf(dayStem), oi = STEMS.indexOf(otherStem);
  const diff = (oi - di + 10) % 10;
  const sameYY = YY[dayStem] === YY[otherStem];
  const dw = WX[dayStem], ow = WX[otherStem];
  if (dw === ow) return sameYY ? '比肩' : '劫财';
  if (SHENG[ow] === dw) return sameYY ? '偏印' : '正印';
  if (SHENG[dw] === ow) return sameYY ? '食神' : '伤官';
  if (KE[ow] === dw) return sameYY ? '七杀' : '正官';
  if (KE[dw] === ow) return sameYY ? '偏财' : '正财';
  return '—';
}

// ============================================================
//  MATCHING ENGINE
// ============================================================
function matchMajors(yongWx, dayStem, strength, pattern, preferCat, isBenke) {
  const level = isBenke ? '本科' : '专科';
  const pool = MAJORS.filter(m => m.l === level);
  if (preferCat) {
    const cat = CATEGORIES.find(c => c.v === preferCat);
    if (cat) {
      const catPool = pool.filter(m => m.c === cat.n);
      if (catPool.length >= 3) return scoreAndRank(catPool, yongWx, dayStem, pattern, 6);
    }
  }
  return scoreAndRank(pool, yongWx, dayStem, pattern, 7);
}

function scoreAndRank(pool, yongWx, dayStem, pattern, limit) {
  const scored = pool.map(m => {
    let s = 50;
    // 喜用神匹配 (40%)
    if (yongWx.some(wx => m.w.includes(wx))) s += 38;
    else if (yongWx.some(wx => SHENG[wx] && m.w.includes(SHENG[wx]))) s += 18;
    // 格局匹配 (25%)
    if ((pattern.includes('正官')||pattern.includes('七杀')) && ['法学','公安司法','经济学'].includes(m.c)) s += 23;
    if (pattern.includes('正印') && ['教育学','文学','历史学'].includes(m.c)) s += 23;
    if (pattern.includes('偏印') && ['理学','哲学','医学'].includes(m.c)) s += 20;
    if ((pattern.includes('食神')||pattern.includes('伤官')) && ['艺术学','文化艺术','工学','电子信息'].includes(m.c)) s += 23;
    if ((pattern.includes('正财')||pattern.includes('偏财')) && ['经济学','管理学','财经商贸'].includes(m.c)) s += 23;
    if ((pattern.includes('比肩')||pattern.includes('劫财')) && ['管理学','工学'].includes(m.c)) s += 18;
    // 热度分 (10%)
    s += (m.h || 3) * 2;
    // Random jitter for variety
    s += (m.n.charCodeAt(0) % 7) - 3;
    return { ...m, score: Math.min(98, s) };
  });
  scored.sort((a,b) => b.score - a.score);
  // 去重 (同专业名)
  const seen = new Set();
  const result = [];
  for (const m of scored) {
    if (!seen.has(m.n) && result.length < limit) { seen.add(m.n); result.push(m); }
  }
  return result;
}

function getStars(score) {
  if (score >= 90) return 5;
  if (score >= 80) return 4;
  if (score >= 70) return 3;
  if (score >= 60) return 2;
  return 1;
}

// ============================================================
//  MAIN
// ============================================================
function analyze() {
  const dateVal = document.getElementById('birthDate').value;
  const calType = document.getElementById('calType').value;
  const birthIdx = parseInt(document.getElementById('birthTime').value);
  const gender = document.getElementById('gender').value;
  const scoreVal = document.getElementById('score').value;
  const province = document.getElementById('province').value;
  const preferRegion = document.getElementById('preferRegion').value;
  const preferCategory = document.getElementById('preferCategory').value;

  if (!dateVal) { toast('请选择出生日期'); return; }

  let date = new Date(dateVal + 'T12:00:00');
  if (calType === 'lunar') date.setMonth(date.getMonth() + 1);

  // 1. 排盘
  const yp = yearPillar(date);
  const mp = monthPillar(date);
  const dp = dayPillar(date);
  const hp = hourPillar(dp.stem, birthIdx);

  const allStems = [yp.stem, mp.stem, dp.stem, hp.stem];
  const allBranches = [yp.branch, mp.branch, dp.branch, hp.branch];
  const allHidden = allBranches.flatMap(b => HIDDEN[b]||[]);

  // 2. 五行分析
  const wc = wuxingCounts(allStems, allBranches);
  const dayWx = WX[dp.stem];
  const strength = judgeStrength(dayWx, mp.branch, wc);
  const yj = yongJi(dayWx, strength, mp.branch);

  // 3. 十神格局
  const ss = allStems.map(s => shiShen(dp.stem, s));
  const ssc = {}; ss.forEach(s => { ssc[s] = (ssc[s]||0)+1; });
  const topSS = Object.entries(ssc).filter(([k]) => k !== '—').sort((a,b) => b[1]-a[1]).slice(0,3);
  const pattern = topSS.map(([k]) => k).join('+') || '中和';

  // 4. 日柱特质
  const dayTraits = {
    '甲':'领导型·管理/教育','乙':'柔韧型·文学/心理','丙':'热情型·表演/科技','丁':'内热型·研发/设计',
    '戊':'厚重型·建筑/金融','己':'细腻型·会计/护理','庚':'刚毅型·法务/外科','辛':'精致型·编程/仪器',
    '壬':'大气型·外交/海洋','癸':'深邃型·哲学/密码'
  };

  // 5. 匹配
  const benkeMajors = matchMajors(yj.yong, dp.stem, strength, pattern, preferCategory, true);
  const zhuankeMajors = matchMajors(yj.yong, dp.stem, strength, pattern, preferCategory, false);

  // 6. 忌神专业
  const jiMajors = [];
  yj.ji.forEach(wx => {
    MAJORS.filter(m => m.w === wx && m.l === '本科').slice(0,2).forEach(m => {
      if (!jiMajors.find(j => j.n === m.n)) jiMajors.push(m);
    });
  });

  // 7. 路径建议
  let pathInfo = {};
  if (pattern.includes('正印') || pattern.includes('正官')) {
    pathInfo = { n:'学术型 · 优先本科', d:'印/官旺相，学术研究能力强，建议优先报考本科院校，后续可考研深造。', c:'gold' };
  } else if (pattern.includes('伤官') && pattern.includes('正印')) {
    pathInfo = { n:'学术+技能型 · 本科优先', d:'伤官配印格局，才华与学识兼备，建议本科走技术与理论结合的专业。', c:'wood' };
  } else if (pattern.includes('食神') || pattern.includes('伤官')) {
    pathInfo = { n:'技能型 · 本专科皆可', d:'食伤主才华技术，专业匹配度优先于学历层次。技术应用型本科或优质专科均可，后期可专升本。', c:'wood' };
  } else if (pattern.includes('正财') || pattern.includes('偏财')) {
    pathInfo = { n:'应用型 · 本科为主', d:'财星格局务实重应用，建议选择应用型本科或行业特色院校，专业对口度影响就业收入。', c:'earth' };
  } else {
    pathInfo = { n:'综合型 · 本科优先', d:'格局中和，适应力强，建议优先本科，大类招生入校后分流。', c:'water' };
  }

  render({ yp,mp,dp,hp,allStems,allBranches,allHidden,wc,dayWx,strength,yj,pattern,topSS,
    dayTraits,benkeMajors,zhuankeMajors,jiMajors,pathInfo,date,gender,scoreVal,province,preferRegion,preferCategory });

  document.getElementById('resultSection').style.display = 'block';
  document.getElementById('inputCard').style.display = 'none';
  document.getElementById('resultSection').scrollIntoView({ behavior:'smooth' });
}

// ============================================================
//  RENDER
// ============================================================
function render(d) {
  const { yp,mp,dp,hp,allBranches,allHidden,wc,dayWx,strength,yj,pattern,topSS,
    dayTraits,benkeMajors,zhuankeMajors,jiMajors,pathInfo,date,gender,scoreVal,province,preferRegion } = d;

  const pillarData = [
    { l:'年柱', s:yp.stem, b:yp.branch, h:allHidden[0] },{ l:'月柱', s:mp.stem, b:mp.branch, h:allHidden[1] },
    { l:'日柱', s:dp.stem, b:dp.branch, h:allHidden[2] },{ l:'时柱', s:hp.stem, b:hp.branch, h:allHidden[3] }
  ];
  let pH = '';
  pillarData.forEach(p => {
    const wx = WX[p.s];
    const cls = `tg-${wx==='金'?'gold':wx==='木'?'wood':wx==='水'?'water':wx==='火'?'fire':'earth'}`;
    pH += `<div class="pillar" style="border-color:var(--${wx==='金'?'gold':wx==='木'?'wood':wx==='水'?'water':wx==='火'?'fire':'earth'})">
      <div class="pillar-label">${p.l}</div>
      <div class="pillar-stem"><span class="tag ${cls}">${p.s}</span></div>
      <div class="pillar-branch">${p.b}</div>
      <div class="pillar-hidden">藏: ${(p.h||[]).join('')}</div>
    </div>`;
  });
  document.getElementById('pillarsContainer').innerHTML = pH;

  document.getElementById('analysisGrid').innerHTML = `
    <div class="analysis-item"><div class="label">日主</div><div class="value">${dp.stem} (${dayWx}·${YY[dp.stem]})</div></div>
    <div class="analysis-item"><div class="label">强弱</div><div class="value">${strength}</div></div>
    <div class="analysis-item"><div class="label">喜用神</div><div class="value" style="color:var(--${dayWx==='金'?'gold':dayWx==='木'?'wood':dayWx==='水'?'water':dayWx==='火'?'fire':'earth'})">${yj.yong.join('、')}</div></div>
    <div class="analysis-item"><div class="label">忌神</div><div class="value" style="color:var(--text2)">${yj.ji.length ? yj.ji.join('、') : '无'}</div></div>
    <div class="analysis-item"><div class="label">十神格局</div><div class="value">${pattern}</div></div>
    <div class="analysis-item"><div class="label">生肖</div><div class="value">${yp.zodiac}</div></div>
  `;

  const maxC = Math.max(...Object.values(wc), 1);
  let wbH = '';
  ['金','木','水','火','土'].forEach(wx => {
    const pct = Math.round(wc[wx]/maxC*100);
    const cf = `f-${wx==='金'?'gold':wx==='木'?'wood':wx==='水'?'water':wx==='火'?'fire':'earth'}`;
    wbH += `<div class="wx-row"><div class="wx-label">${wx}</div><div class="wx-bar"><div class="wx-fill ${cf}" style="width:${pct}%"></div></div><div class="wx-count">${wc[wx]}</div></div>`;
  });
  document.getElementById('wuxingBars').innerHTML = wbH;

  document.getElementById('pathContent').innerHTML = `
    <div style="font-size:1.1rem;font-weight:600;margin-bottom:6px;">🎯 ${pathInfo.n}</div>
    <div style="color:var(--text2);">${pathInfo.d}</div>
    <div style="margin-top:10px;font-size:0.82rem;color:var(--text2);">基础：日主${strength} · ${pattern} · 喜${yj.yong.join('、')} · ${yj.reason}</div>
    <div style="margin-top:6px;font-size:0.82rem;color:var(--gold-light);">🧬 日柱特质：${dayTraits[dp.stem] || '综合型'}</div>
  `;

  document.getElementById('tab-benke').innerHTML = renderCards(benkeMajors,'benke');
  document.getElementById('tab-zhuanke').innerHTML = renderCards(zhuankeMajors,'zhuanke');
  document.getElementById('tab-strategy').innerHTML = renderStrategy(d);
  document.getElementById('tab-claude').innerHTML = renderClaudePrompt(d);
  resetTabs();

  let warnH = '<p style="color:var(--text2);margin-bottom:10px;">以下方向对应忌神五行（'+yj.ji.join('、')+'），建议谨慎选择：</p>';
  if (jiMajors.length) {
    jiMajors.slice(0,4).forEach(m => {
      warnH += `<div class="advice-box warn">🚫 <strong>${m.n}</strong>（${m.c}·${m.w}）— 忌神方向，学习过程可能较为吃力</div>`;
    });
  } else {
    warnH += '<p style="color:var(--text2);">未检测到强烈忌讳方向，但建议回避与忌神五行高度相关的专业。</p>';
  }
  document.getElementById('warnContent').innerHTML = warnH;
}

function renderCards(majors, type) {
  if (!majors.length) return '<p style="color:var(--text2);">暂无匹配结果，请尝试调整筛选条件</p>';
  return majors.map(m => {
    const stars = getStars(m.score);
    const sText = '⭐'.repeat(stars) + (stars < 5 ? '☆'.repeat(5-stars) : '');
    const scCls = stars >= 5 ? 'score-high' : stars >= 4 ? 'score-mid' : 'score-ok';
    const wxCls = `tg-${(m.w||'土').includes('金')?'gold':(m.w||'').includes('木')?'wood':(m.w||'').includes('水')?'water':(m.w||'').includes('火')?'fire':'earth'}`;
    return `<div class="major-card ${type}">
      <div class="major-info">
        <div class="major-name">${m.n} <span class="tag ${wxCls}">${m.w}</span></div>
        <div class="major-meta"><span>${m.c}</span><span>·</span><span>${m.l}</span><span class="score-badge ${scCls}">${m.score}分</span></div>
        <div class="major-reason">${m.r}</div>
      </div>
      <div class="major-stars">${sText}</div>
    </div>`;
  }).join('');
}

function renderStrategy(d) {
  const { yj, pattern, strength, preferRegion } = d;
  const yongWx = yj.yong[0];
  const region = REGIONS.find(r => r.v === preferRegion);
  let rAdvice = '';
  if (region) {
    const match = region.wx === yongWx ? '✅ 与喜用神一致' : (yj.ji.includes(region.wx) ? '⚠️ 与忌神重叠，建议慎重' : '➖ 中性');
    rAdvice = `<div class="advice-box">📍 ${region.n}：${region.desc} ${match}</div>`;
  }

  const schoolType = yongWx === '金' ? '财经类、政法类、理工类院校' :
    yongWx === '木' ? '师范类、农林类、医药类院校' :
    yongWx === '水' ? '外语类、综合类、海洋类院校' :
    yongWx === '火' ? '理工类、艺术类、电力类院校' : '土木建筑类、医药类、综合类院校';

  const priorityAdvice = (pattern.includes('食神') || pattern.includes('伤官')) && !pattern.includes('正印') ?
    '建议 <b>专业优先</b> — 技术/艺术型人才，专业含金量决定发展上限' :
    (pattern.includes('正官') || pattern.includes('比肩')) ? '可偏 <b>学校优先</b> — 名校品牌和人脉资源对发展更有价值' :
    '建议 <b>专业与学校平衡</b> — 选择大类招生院校，入校后再分流';

  return `
    <h3>🎯 八字视角的志愿策略</h3>
    <div class="advice-box"><strong>冲：</strong>喜用神 <b>${yongWx}</b> 对应的专业可适当冲刺更高层次院校<br>
    <strong>稳：</strong><b>${pattern}</b> 格局匹配的方向作为稳定志愿<br>
    <strong>保：</strong>中性五行（土/金类）的包容性强专业作为保底</div>
    <div class="advice-box"><strong>🏫 院校类型建议：</strong>${schoolType}</div>
    ${rAdvice}
    <div class="advice-box"><strong>📊 专业vs学校：</strong>${priorityAdvice}</div>
    ${scoreVal ? `<div class="advice-box"><strong>📝 分数参考：</strong>结合 <b>${scoreVal}</b> 分和省份排名，筛选匹配专业对应的院校往年录取位次，按冲稳保合理分布。</div>` : ''}
    <div class="stats-row">
      <div class="stat-item"><div class="stat-num">${yj.yong.length}</div><div class="stat-label">喜用神五行</div></div>
      <div class="stat-item"><div class="stat-num">${pattern.split('+').length}</div><div class="stat-label">主导格局</div></div>
      <div class="stat-item"><div class="stat-num">${yj.ji.length||0}</div><div class="stat-label">忌神五行</div></div>
    </div>
    <p style="color:var(--text2);font-size:0.78rem;margin-top:8px;">💡 以上建议基于八字分析。实际填报请结合高考分数排名、院校招生计划和就业趋势综合判断。</p>
  `;
}

function renderClaudePrompt(d) {
  const { date, gender, scoreVal, pattern, yj, strength } = d;
  const dateStr = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
  const shichen = SHICHEN[parseInt(document.getElementById('birthTime').value)].n;
  const prompt = `/bazi-major-match 分析我的八字并进行专业匹配：

出生：${dateStr} ${shichen} ${gender==='male'?'男':'女'}${scoreVal ? `\n高考：${scoreVal}分` : ''}
初步结果：日主${strength} · ${pattern} · 喜${yj.yong.join('、')}

请给出：完整排盘、五行十神分析、本专科专业推荐（各3-5个附理由）、志愿填报冲稳保策略、院校类型和地域建议。`;

  return `
    <p style="color:var(--text2);margin-bottom:12px;">复制以下内容，在 Claude Code 中获取更精准的深度分析（需先 cd 到 bazi-major-match 目录）：</p>
    <div class="copy-area" id="claudePrompt">${prompt}</div>
    <button class="btn btn-secondary btn-small" onclick="copyPrompt()" style="margin-top:10px;">📋 一键复制</button>
    <p style="color:var(--text2);font-size:0.78rem;margin-top:8px;">启动：<code>cd C:\\Users\\吕泓磊\\bazi-major-match</code> 然后粘贴</p>
  `;
}

// ============================================================
//  BROWSE TAB
// ============================================================
let browseFilter = 'all', browseSort = 'wuxing', browseSortDir = 1, browseSearch = '';

function renderBrowseTable() {
  let pool = [...MAJORS];
  if (browseFilter !== 'all') {
    if (browseFilter === 'benke') pool = pool.filter(m => m.l === '本科');
    else if (browseFilter === 'zhuanke') pool = pool.filter(m => m.l === '专科');
    else pool = pool.filter(m => m.w.includes(browseFilter));
  }
  if (browseSearch) {
    const q = browseSearch.toLowerCase();
    pool = pool.filter(m => m.n.toLowerCase().includes(q) || m.c.toLowerCase().includes(q));
  }
  if (browseSort === 'name') pool.sort((a,b) => browseSortDir * a.n.localeCompare(b.n,'zh'));
  else if (browseSort === 'score') pool.sort((a,b) => browseSortDir * ((b.h||3) - (a.h||3)));
  else if (browseSort === 'wuxing') pool.sort((a,b) => browseSortDir * (a.w||'').localeCompare(b.w||''));
  else if (browseSort === 'category') pool.sort((a,b) => browseSortDir * a.c.localeCompare(b.c,'zh'));

  const wxCls = (w) => `tg-${(w||'土').includes('金')?'gold':(w||'').includes('木')?'wood':(w||'').includes('水')?'water':(w||'').includes('火')?'fire':'earth'}`;

  let h = `<div class="filter-bar">
    <button class="filter-btn ${browseFilter==='all'?'active':''}" onclick="setBrowseFilter('all')">全部</button>
    <button class="filter-btn ${browseFilter==='benke'?'active':''}" onclick="setBrowseFilter('benke')">本科</button>
    <button class="filter-btn ${browseFilter==='zhuanke'?'active':''}" onclick="setBrowseFilter('zhuanke')">专科</button>
    <button class="filter-btn ${browseFilter==='金'?'active':''}" onclick="setBrowseFilter('金')">金</button>
    <button class="filter-btn ${browseFilter==='木'?'active':''}" onclick="setBrowseFilter('木')">木</button>
    <button class="filter-btn ${browseFilter==='水'?'active':''}" onclick="setBrowseFilter('水')">水</button>
    <button class="filter-btn ${browseFilter==='火'?'active':''}" onclick="setBrowseFilter('火')">火</button>
    <button class="filter-btn ${browseFilter==='土'?'active':''}" onclick="setBrowseFilter('土')">土</button>
    <input class="search-input" type="text" placeholder="🔍 搜索专业名称..." value="${browseSearch}" oninput="setBrowseSearch(this.value)">
  </div>`;

  h += `<p style="font-size:0.78rem;color:var(--text2);margin-bottom:8px;">共 ${pool.length} 个专业</p>`;
  h += `<table class="major-table"><thead><tr>
    <th onclick="toggleBrowseSort('name')">专业名称 <span class="sort-arrow">${browseSort==='name'?(browseSortDir>0?'▲':'▼'):''}</span></th>
    <th onclick="toggleBrowseSort('category')">学科门类 <span class="sort-arrow">${browseSort==='category'?(browseSortDir>0?'▲':'▼'):''}</span></th>
    <th onclick="toggleBrowseSort('wuxing')">五行 <span class="sort-arrow">${browseSort==='wuxing'?(browseSortDir>0?'▲':'▼'):''}</span></th>
    <th>层次</th>
    <th onclick="toggleBrowseSort('score')">热度 <span class="sort-arrow">${browseSort==='score'?(browseSortDir>0?'▲':'▼'):''}</span></th>
  </tr></thead><tbody>`;

  pool.forEach(m => {
    h += `<tr>
      <td style="font-weight:500;">${m.n}</td>
      <td>${m.c}</td>
      <td><span class="tag ${wxCls(m.w)}">${m.w}</span></td>
      <td>${m.l}</td>
      <td>${'🔥'.repeat(m.h||3)}</td>
    </tr>`;
  });
  h += '</tbody></table>';
  document.getElementById('tab-browse').innerHTML = h;
}

function setBrowseFilter(f) { browseFilter = f; renderBrowseTable(); }
function setBrowseSearch(q) { browseSearch = q; renderBrowseTable(); }
function toggleBrowseSort(field) {
  if (browseSort === field) browseSortDir *= -1; else { browseSort = field; browseSortDir = -1; }
  renderBrowseTable();
}

// ============================================================
//  HELPERS
// ============================================================
function switchTab(name) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  const tab = document.querySelector(`.tab[onclick="switchTab('${name}')"]`);
  if (tab) tab.classList.add('active');
  const content = document.getElementById(`tab-${name}`);
  if (content) content.classList.add('active');
  if (name === 'browse') renderBrowseTable();
}

function resetTabs() {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  const firstTab = document.querySelector('.tab');
  if (firstTab) firstTab.classList.add('active');
  const bc = document.getElementById('tab-benke');
  if (bc) bc.classList.add('active');
}

function resetForm() {
  document.getElementById('resultSection').style.display = 'none';
  document.getElementById('inputCard').style.display = 'block';
  window.scrollTo({ top:0, behavior:'smooth' });
}

function copyPrompt() {
  const text = document.getElementById('claudePrompt').innerText;
  navigator.clipboard.writeText(text).then(() => toast('✅ 已复制到剪贴板！'));
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2000);
}

document.getElementById('birthDate').addEventListener('keydown', e => { if (e.key === 'Enter') analyze(); });

// Pre-render browse on page load
window.addEventListener('DOMContentLoaded', () => renderBrowseTable());
