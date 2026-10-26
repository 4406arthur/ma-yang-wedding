(function(){
  var TS='马马張张陳陈劉刘楊杨鄭郑黃黄吳吴韓韩葉叶湯汤蕭萧賴赖孫孙溫温蘇苏顏颜呂吕鳳凤豐丰謀谋學学緯纬偉伟慶庆葒荭韋韦暘旸蕎荞銓铨賢贤堯尧國国棟栋彥彦鈺钰權权軒轩齊齐瑋玮顯显詠咏發发榮荣蘭兰鈞钧華华茲兹評评聖圣鎮镇夢梦紅红啟启寬宽藍蓝躍跃親亲豫豫叡睿';
  var t2s={};for(var i=0;i<TS.length;i+=2)t2s[TS[i+1]]=TS[i];
  t2s['馬']='馬';t2s['马']='馬';t2s['啓']='啟';t2s['爲']='為';
  var groups=['偉韋瑋緯葳威維','庭廷婷亭停','宇羽雨禹','翰涵漢含','琇秀','茲姿資孜','佑祐右又','智志致','豪浩','嘉佳家','凱楷愷','霖林琳麟','睿瑞叡銳','銓荃全泉','欣心新馨','蓉榕容融','晟成承誠','易奕亦逸佾羿翊','宏弘鴻紅','明銘鳴名','芝之知枝','婉宛','齊琪祺奇棋其','晨辰臣陳','懿儀宜怡依壹一','昌長常','珊杉姍','葆寶保','瑄萱軒宣','衍彥燕','益義意毅藝','羚玲齡鈴伶','蕎喬巧橋','泰太','柏伯博','錦金今','豐風峰鋒','子紫梓','思斯絲','學雪','堯瑤遙','光廣','棟東冬','鈞君均軍','淙宗聰','雯文聞','聖勝盛','霞夏','蘭藍嵐','月悅越','耀曜','章彰張','兆照昭','仙先','玉育','秉炳','鎮振震','茹如儒','桐彤同童','京晶菁','莉麗立利','建健劍','華化','謦慶','吳伍武','黃王','劉柳','楊陽洋','蔡菜','邱秋丘','胡湖','田甜','郭國','曾增','何河','徐許','林臨','鄭正政','葉業','李理','顏言','韓寒','包寶','沈審','湯唐','蘇舒','孫','呂旅','周州'];
  var canon={};groups.forEach(function(g){var c=g[0];for(var k of g)if(!canon[k])canon[k]=c;});
  function norm(s){var o='';for(var ch of String(s).toLowerCase()){if(/[\s\-_.·]/.test(ch))continue;ch=t2s[ch]||ch;o+=ch}return o}
  function sound(s){var o='';for(var ch of s)o+=canon[ch]||ch;return o}
  function lev(a,b){var m=a.length,n=b.length,d=[];for(var i=0;i<=m;i++){d[i]=[i]}for(var j=0;j<=n;j++)d[0][j]=j;for(i=1;i<=m;i++)for(j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]==b[j-1]?0:1));return d[m][n]}
  function scoreOne(q,qs,t){
    var tn=norm(t),ts=sound(tn);if(!tn)return 0;
    var p=tn.indexOf(q);if(p>=0)return 100-p-(tn.length-q.length)*.5;
    p=ts.indexOf(qs);if(p>=0)return 80-p;
    if(/^[a-z0-9]+$/.test(q)){if(q.length>=3){var best=9;for(var L=Math.max(1,q.length-1);L<=q.length+1;L++)for(var s=0;s+L<=tn.length;s++)best=Math.min(best,lev(q,tn.substr(s,L)));if(best<=1)return 60-best}return 0}
    var hit=0;for(var ch of qs)if(ts.indexOf(ch)>=0)hit++;
    if(q.length>=2&&hit>=q.length-1&&hit>=1)return 40+hit*5;
    return 0}
  window.SeatSearch={norm:norm,search:function(guests,raw){
    var q=norm(raw);if(!q)return[];var qs=sound(q);
    var tm=q.match(/^(?:第)?(\d{1,2})(?:桌)?$/);
    var out=[];guests.forEach(function(g){
      var sc=0;[g.name].concat(g.aliases).forEach(function(t){sc=Math.max(sc,scoreOne(q,qs,t))});
      if(tm&&g.table==+tm[1])sc=Math.max(sc,90);
      if(sc>0)out.push({g:g,s:sc})});
    out.sort(function(a,b){return b.s-a.s||a.g.table-b.g.table});return out.map(function(x){return x.g}).slice(0,12)}};
})();
