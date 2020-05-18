class AhoCorasik
{
  constructor(which, nmax = 1000) // (IEnumerable which, int nmax = 1000)
  {
    this.t = []
    this.sz = 0;
    this.stringlen = 0;
      this.init(nmax);
      for(let i = 0; i < which.length; ++i)
      {
          this.add_string(which[i]);
          this.stringlen++;
      }
    this.substrings = which;
    this.statusarr = [];
    this.string = "";
    this.result = [];
    this.vert = []
  }

  findMaxMoveStr(){
    this.statusarr[this.statusarr.length - 1]["notmovestr"] = 1
    for (var i = this.statusarr.length - 1; i >= 0; i--) {
      if(this.statusarr[i]["try_to_go_next"]){
        this.statusarr[this.statusarr.length - 1]["try_to_go_next"] = this.statusarr[i]["try_to_go_next"]
        return ["try_to_go_next",this.statusarr[i]["try_to_go_next"]]
      }
      if(this.statusarr[i]["result"]){
        this.statusarr[this.statusarr.length - 1]["result"] = this.statusarr[i]["result"]
        this.statusarr[this.statusarr.length - 1]["pos"] = this.statusarr[i]["pos"]
        return ["result",this.statusarr[i]["result"],"pos",this.statusarr[i]["pos"]]
      }
      if(this.statusarr[i]["id"]){
        this.statusarr[this.statusarr.length - 1]["id"] = this.statusarr[i]["id"]
        return ["id",this.statusarr[i]["id"]]
      }
    }
  }

  // get t(){
  //   return t;
  // }
  // set t(val){
  //   t = val;
  // }

  // get sz(){
  //   return sz;
  // }
  // set sz(val){
  //   sz = val;
  // }

  // findInString(s, w) // (string s, string[] w)
  // {
  //     let i = 0;
  //     for (i = 0; i < w.length; i++)
  //     {
  //         if (s == w[i]) return i;
  //     }
  //     return i;
  // }

  /// <summary>
  /// Find substring in string 
  /// </summary>
  /// <param name="where"></param>
  /// <returns></returns> public vector<pair<vector<int>,string>>
  find(where) // (string where)
  {
      this.statusarr = [];
      this.string = where;
      this.result = [];
      let v = 0;
      let n = [] //new vector<pair<vector<int>, string>>();
      for(let i = 0; i < where.length; i++)
      {
          // this.get_link(v)
          // console.log(i, where[i],this.t[v].stringid, this.t[v].stringelid)
          // console.log(this.statusarr)
          // console.log(" ",this.t[v].link,this.t[this.t[v].link].stringid,this.t[this.t[v].link].stringelid)
          // for(let ii = 0; ii < 256; ++ii){
          //   if(this.t[v].go[String.fromCharCode(ii)] != -1){
          //     console.log("\t",String.fromCharCode(ii),this.t[this.t[v].go[String.fromCharCode(ii)]].stringid,this.t[this.t[v].go[String.fromCharCode(ii)]].stringelid)
          //   }
          // }
          // console.log(this.t[v].go)
          // console.log(v, where[i])
          v = this.go(v, where[i]);
          this.statusarr.push({"vertex":this.t[v],"id":i})
          // console.log(v)
          let pv = v;
          while(pv != 0) {
            this.statusarr.push({"check_vertex":this.t[v]})
            this.findMaxMoveStr()
            if (this.t[pv].leaf && this.t[pv].leafs.length>0)
            {
                this.statusarr.push({"result":this.t[pv].leafs,"pos":i - this.t[pv].leafs.length + 1})
                let j = 0; // int
                let flag = true; // bool
                for(j = 0; j < n.length; ++j)
                {
                    if(n[j]["second"] == this.t[pv].leafs)
                    {
                        n[j]["first"].push(i - this.t[pv].leafs.length + 1);
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    n.push({"first":[], "second":""});
                    j = n.length - 1;
                    //n[j] = new pair<vector<int>, string>();
                    n[j]["second"] = this.t[pv].leafs;
                    //n[j].setsecond(t[pv].leafs);
                    //vector<int> _ = new vector<int>();
                    n[j]["first"] = [];//_;
                    //n[j].setfirst(_);
                    n[j]["first"].push(i - this.t[pv].leafs.length + 1);
                }
            }
            pv = this.get_link(pv)
          }
      }
      this.result = n
      return n;
  }

  // /// <summary>
  // /// Find substring in collection string
  // /// </summary>
  // /// <param name="ii">String</param>
  // /// <param name="isienumerable">Fictive parameter</param>
  // /// <returns></returns>
  // find(ii, isarr) // public IEnumerable<vector<pair<vector<int>, string>>>    (IEnumerable ii, bool isienumerable)
  // {
  //     int v = 0;
  //     int iin = -1;
  //     vector<pair<vector<int>, string>> n = new vector<pair<vector<int>, string>>();
  //     foreach (string where in ii)
  //     {

  //         ++iin;
  //         for (let i = 0; i < where.Length; i++)
  //         {
  //             v = go(v, where[i]);
  //             if (t[v].leaf)
  //             {
  //                 int j = 0;
  //                 bool flag = true;
  //                 for (j = 0; j < n.size(); ++j)
  //                 {
  //                     if (n[j].second == t[v].leafs)
  //                     {
  //                         n[j].first.append(i - t[v].leafs.Length + 1);
  //                     }
  //                 }
  //                 if (flag)
  //                 {
  //                     n.append(new pair<vector<int>, string>());
  //                     j = n.size() - 1;
  //                     //n[j] = new pair<vector<int>, string>();
  //                     n[j].second=t[v].leafs;
  //                     n[j].first = new vector<int>();
  //                     n[j].first.append(i - t[v].leafs.Length + 1);
  //                 }
  //             }
  //         }
  //         yield return n;
  //     }
  // }








  

  build(nmax = 1000) // (int nmax = 1000) 
  {
      this.t = [];
      for(let i = 0; i < nmax + 1; i++)
      {
         this.t.push(new vertex());
      }
  }
  // vertex[] t;
  // int sz;

  memset() // (out int[] p, int _, int[] __)
  {
      let p = [];
      for (let i = 0; i < 256; ++i)
      {
          p[String.fromCharCode(i)] = -1;
      }
      return p;
  }

  init(nmax = 1000) // (int nmax = 1000)
  {
      this.build(nmax);
      this.t[0].p = -1;
      this.t[0].link = -1;
      //t[0].myadress = 0;
      this.t[0].next = this.memset();
      this.t[0].go = this.memset();
      this.sz = 1;
  }

  add_string(s) { // (string s)
    console.log("add string " + s)
    let v = 0;
    for (let i = 0; i < s.length; ++i) {
      let c = s[i]; // char
      if (this.t[v].next[c] == -1) {
        this.t[this.sz].next = this.memset(); //ERROR
        this.t[this.sz].go = this.memset();
        this.t[this.sz].link = -1;
        this.t[this.sz].p = v;
        this.t[this.sz].pch = c;
        this.t[this.sz].stringid = this.stringlen;
        this.t[this.sz].stringelid = i;
        this.t[this.sz].id = this.sz;
        this.t[v].next[c] = this.sz++;
      }
      v = this.t[v].next[c];
    }
    this.t[v].leaf = true;
    this.t[v].leafs = s;
  }

  //int go(int v, char c);

  get_link(v) // (int v)
  {
      this.statusarr.push({"get_link":this.t[v]})
      this.findMaxMoveStr()
      if (this.t[v].link == -1)
          if (v == 0 || this.t[v].p == 0){
              this.t[v].link = 0;
              this.t[v].linkFixStep = this.statusarr.length - 1
            }
          else{
              this.statusarr.push({"update_link_from_parent":this.t[v]})
              this.findMaxMoveStr()
              this.t[v].link = this.go(this.get_link(this.t[v].p), this.t[v].pch);
              this.t[v].linkFixStep = this.statusarr.length - 1
          }
      this.statusarr.push({"return_link":this.t[v]})
      this.findMaxMoveStr()
      return this.t[v].link;
  }

  go(v, c) // (int v, char c)
  {
    this.statusarr.push({"try_to_go_next":this.t[v],"symb":c})
      if (this.t[v].go[c] == -1)
          if (this.t[v].next[c] != -1)
              this.t[v].go[c] = this.t[v].next[c];
          else{
              this.statusarr.push({"go_by_link":this.t[v]})
              this.findMaxMoveStr()
              this.t[v].go[c] = v == 0 ? 0 : this.go(this.get_link(v), c);
          }
      return this.t[v].go[c];
  }


  countpos(v = 0,p = 0,h = 0){
    if(v == -1) return 0
    this.vert.push(v)
    // console.log(h,v,this.t[v].pch)
    this.t[v].depth = h
    this.t[v].startpos = p
    this.t[v].width = 0
    for (var i = 0; i < 256; i++) {
      console.log(v,".width now = ",this.t[v].width)
      this.t[v].width += this.countpos(this.t[v].next[String.fromCharCode(i)],p+this.t[v].width,h+1)
    }
    this.t[v].width = this.t[v].width == 0?1:this.t[v].width
    return this.t[v].width
  }

}

class vertex
  {
    constructor()
    {
      this.next = [];
      this.leaf = true;
      this.leafs = "";
      this.p = 0;
      this.pch = '';
      this.link = 0;
      this.go = [];
      this.stringid = -1;
      this.stringelid = -1;

      this.width = -1;
      this.depth = -1;
      this.startpos = -1;
      this.shift = -1;
      this.id = 0;
      this.linkFixStep = -1;
    }
      // public int[] next; //adress
      // public bool leaf;
      // public string leafs;
      // public int p;
      // public char pch;
      // public int link;
      // public int[] go; //adress
      // //public int myadress;
  }







function test(strok = "abacabadabacab", strarr = ["aba","cab","bac","abacab"]){
  // let ac = new AhoCorasik(strarr)
  // // console.log(ac.t)
  // console.log(ac.find(strok))


}


let ahoCorasik
let state = 0
let ressubstr = []
let resstr = ""
// let markedSubStr = []
let nowindex = 0

function setProgress(v){
  document.getElementById("progressbar").getElementsByTagName("div")[0].style.width=`${v}%`
  document.getElementById("progress").innerHTML = `${state} / ${ahoCorasik.statusarr.length}`
}

function selectSymbolStr(k,color,n = 1, color2 = ""){
  if(color2.length == 0) color2 = color
  let src = resstr
  let res = "<div>"
  for (var i = 0; i < src.length; i++) {
    if(i<k || i >= k+n) res += src[i] == " "?"&nbsp":src[i]
    else if(i!=k+n-1) res += `<span style="background-color: ${color}">${src[i] == " "?"&nbsp":src[i]}</span>`
    else res += `<span style="background-color: ${color2}">${src[i] == " "?"&nbsp":src[i]}</span>`
  }
  res+="</div>"
  document.getElementById("string").innerHTML = res
}

let oldv = []

function fixtree(){
  makeTable()
  for (var i = 0; i < oldv.length; i++) {
    document.getElementById("tree").getElementsByTagName("tr")[oldv[i].depth].getElementsByTagName("td")[oldv[i].shift].style.backgroundColor = ""
  }
  oldv = []

  for (var j = 0; j < ressubstr.length; j++) {
    let src = ressubstr[j]
    let res = ""
    for (var i = 0; i < src.length; i++) {
      res += (src[i] == " "?"&nbsp":src[i])
    }
    // console.log(j,res)
    document.getElementById("substrings").getElementsByTagName("div")[j].innerHTML = res
  }
}

function selectSymbolSubStr(v,color){
  fixtree()
  let n = v.stringid
  let k = v.stringelid
  console.log(n,k,v.depth, v.shift)
  k = k+1
  // console.log(n,k)
  if(n === -1){
    for (var j = 0; j < ressubstr.length; j++) {
      let src = ressubstr[j]
      let res = ""
      for (var i = 0; i < src.length; i++) {
        if(i!=k) res += (src[i] == " "?"&nbsp":src[i])
        else res += `<spam style="background-color: ${color}">${src[i] == " "?"&nbsp":src[i]}</spam>`
      }
      // console.log(j,res)
      document.getElementById("substrings").getElementsByTagName("div")[j].innerHTML = res
    }
  }
  else{
    let src = ressubstr[n]
    let res = ""
    for (var i = 0; i < src.length; i++) {
      if(i!=k) res += (src[i] == " "?"&nbsp":src[i])
      else res += `<spam style="background-color: ${color}">${src[i] == " "?"&nbsp":src[i]}</spam>`
    }
    document.getElementById("substrings").getElementsByTagName("div")[n].innerHTML = res
  }
  document.getElementById("tree").getElementsByTagName("tr")[v.depth].getElementsByTagName("td")[v.shift].style.backgroundColor = "rgba(230, 19, 19, 0.64)"
  oldv.push(v)
}

function selectSymbolSubStrP(v,v2,color, color2){
  fixtree()
  let n = v.stringid
  let k = v.stringelid
  let n2 = v2.stringid
  let k2 = v2.stringelid
  k = k+1
  k2 = k2+1
  if(n == n2){
    if(n == -1){
      for (var j = 0; j < ressubstr.length; j++) {
        let src = ressubstr[j]
        let res = ""
        for (var i = 0; i < src.length; i++) {
          if(i!=k) res += (src[i] == " "?"&nbsp":src[i])
          else res += `<span style="background-color: ${color}">${src[i] == " "?"&nbsp":src[i]}</span>`
        }
        document.getElementById("substrings").getElementsByTagName("div")[j].innerHTML = res
      }
    }
    else{
      let src = ressubstr[n]
      let res = ""
      for (var i = 0; i < src.length; i++) {
        if(i!=k && i!=k2) res += (src[i] == " "?"&nbsp":src[i])
        else if(i==k) res += `<span style="background-color: ${color}">${src[i] == " "?"&nbsp":src[i]}</span>`
        else res += `<span style="background-color: ${color2}">${src[i] == " "?"&nbsp":src[i]}</span>`
      }
      document.getElementById("substrings").getElementsByTagName("div")[n].innerHTML = res
    }
  }
  else{
    if(n == -1 || n2 == -1){
      for (var j = 0; j < ressubstr.length; j++) {
        let src = ressubstr[j]
        let res = ""
        for (var i = 0; i < src.length; i++) {
          if((i!=k && n==-1) || (i!=k2 && n2==-1)) res += (src[i] == " "?"&nbsp":src[i])
          else if(n == -1 && i==k) res += `<span style="background-color: ${color}">${src[i] == " "?"&nbsp":src[i]}</span>`
            else if(n2 == -1 && i==k2) res += `<span style="background-color: ${color2}">${src[i] == " "?"&nbsp":src[i]}</span>`
        }
        document.getElementById("substrings").getElementsByTagName("div")[j].innerHTML = res
      }
    }
    if(n != -1){
      let src = ressubstr[n]
      let res = ""
      for (var i = 0; i < src.length; i++) {
        if(i!=k) res += (src[i] == " "?"&nbsp":src[i])
        else res += `<span style="background-color: ${color}">${src[i] == " "?"&nbsp":src[i]}</span>`
      }
      document.getElementById("substrings").getElementsByTagName("div")[n].innerHTML = res
    }
    if(n2 != -1){
      src = ressubstr[n2]
      res = ""
      for (var i = 0; i < src.length; i++) {
        if(i!=k2) res += (src[i] == " "?"&nbsp":src[i])
        else res += `<span style="background-color: ${color2}">${src[i] == " "?"&nbsp":src[i]}</span>`
      }
      document.getElementById("substrings").getElementsByTagName("div")[n2].innerHTML = res
    }
  }
  document.getElementById("tree").getElementsByTagName("tr")[v.depth].getElementsByTagName("td")[v.shift].style.backgroundColor = color
  oldv.push(v)
  if(v2.id!=v.id){
    document.getElementById("tree").getElementsByTagName("tr")[v2.depth].getElementsByTagName("td")[v2.shift].style.backgroundColor = color2
    oldv.push(v2)
  }
}

const makeResSubStr = (arr)=>{
  res = ""
  for (var i = 0; i < arr.length; i++) {
    res += `<div>${arr[i]}</div>\n`
  }
  return res
}

function changeSS(){
  document.getElementById("ressubstrtd").style.display = ""
  document.getElementById("resstrtd").style.display = "none"
}

let table = []
let tablerows = []

function makeTable(){
  table = []
  tablerows = []
  let maxn = 0
  for (var j = 0; j < ahoCorasik.vert.length; j++) {
    let i = ahoCorasik.vert[j]
    if(!table[ahoCorasik.t[i].depth]){
      console.log("Add row by ",i,ahoCorasik.t[i].pch,ahoCorasik.t[i].depth)
      if(ahoCorasik.t[i].depth > maxn)
        maxn = ahoCorasik.t[i].depth
      table[ahoCorasik.t[i].depth] = 0
      tablerows[ahoCorasik.t[i].depth] = ""
    }
    if(ahoCorasik.t[i].startpos > table[ahoCorasik.t[i].depth]){
      // console.log("AAA",ahoCorasik.t[i].id,ahoCorasik.t[i].pch)
      tablerows[ahoCorasik.t[i].depth] += `<td colspan="${ahoCorasik.t[i].startpos - table[ahoCorasik.t[i].depth]}" style="border-width: 0px; border-style: none; "></td>`
      table[ahoCorasik.t[i].depth] += ahoCorasik.t[i].startpos - table[ahoCorasik.t[i].depth]
    }
    ahoCorasik.t[i].shift = table[ahoCorasik.t[i].depth]
    table[ahoCorasik.t[i].depth] += ahoCorasik.t[i].width
    tablerows[ahoCorasik.t[i].depth] += `<td colspan="${ahoCorasik.t[i].width}" style="border-width: 1px;border-style: solid; ">${i}:'${ahoCorasik.t[i].pch}'<br/>l:${(ahoCorasik.t[i].link==-1 || ahoCorasik.t[i].linkFixStep > state)?(i==0?0:"N"):ahoCorasik.t[i].link}</td>`
  }

  let res = ""
  for (var i = 0; i < maxn+1; i++) {
    res += `<tr align="center">${tablerows[i]}</tr>`
  }
  document.getElementById("tree").innerHTML = res

}

function fillACB(){
  document.getElementById("ressubstr").value = "aba"
}

function fillACM(){
  document.getElementById("ressubstr").value = "aba\ncaba"
}

function fillACW(){
  document.getElementById("ressubstr").value = `c
cc
ccc
cccc
ccccc
cccccc
ccccccc
cccccccc`
}

function fillSB(){
  document.getElementById("resstr").value = "aba"
}

function fillSM(){
  document.getElementById("resstr").value = "abacabadaba"
}

function fillSW(){
  document.getElementById("resstr").value = "cccccccc"
}

function fillAC(){
  ressubstr = document.getElementById("ressubstr").value.split('\n')
  console.log(ressubstr)
  ahoCorasik = new AhoCorasik(ressubstr);
  ahoCorasik.countpos()
  makeTable()
  for (var i = 0; i < ressubstr.length; i++) {
    ressubstr[i] = " " + ressubstr[i]
  }
  document.getElementById("ressubstrtd").style.display = "none"
  document.getElementById("resstrtd").style.display = ""
  document.getElementById("substrings").innerHTML = makeResSubStr(ressubstr)
}

function changeS(){
  document.getElementById("inputs").style.display = ""
  document.getElementById("controls_and_tree").style.display = "none"
  document.getElementById("visualizing").style.display = "none"
}

function startVis(){
  // ressubstr = []
  nowindex = 0
  resstr = " " + document.getElementById("resstr").value
  document.getElementById("string").innerHTML = `<div>${resstr}</div>`
  console.log(ahoCorasik.find(resstr))
  state = 0
  showState()
  document.getElementById("inputs").style.display = "none"
  document.getElementById("controls_and_tree").style.display = ""
  document.getElementById("visualizing").style.display = ""
}

function nextState(){
  state += 1
  if(state > ahoCorasik.statusarr.length)
    state = ahoCorasik.statusarr.length
  else showState()
}

function previousState(){
  state -= 1
  if(state < 0)
    state = 0
  else showState()
}

const makeRes = ()=>{
  res = `<p>Вычисление завершено, результат:<br/>`
  for(let i = 0; i < ahoCorasik.result.length; ++i){
    if(ahoCorasik.result[i]["second"].length == 0) continue
    res += `&nbsp&nbspПодстрока "${ahoCorasik.result[i]["second"]}" входит ${ahoCorasik.result[i]["first"].length} раз`
    if(ahoCorasik.result[i]["first"].length > 0)
      res += ` начиная с позиции:<br/>`
    else res += `;<br/>`
    for (let j = 0; j < ahoCorasik.result[i]["first"].length; j++) {
      res += `&nbsp&nbsp&nbsp&nbsp${ahoCorasik.result[i]["first"][j]};<br/>`
    }
  }
  res += `</p>`
  return res
}

function selectAlgo(state, color="#ff0"){
  if(state<-1 || state >= ahoCorasik.statusarr.length) return -1
  console.log(ahoCorasik.statusarr[state],color)
    if(state == -1){
      document.getElementById("algoFind").getElementsByTagName("div")[1].style.backgroundColor = color
      return 0
    }
    if(ahoCorasik.statusarr[state]["try_to_go_next"] && !ahoCorasik.statusarr[state]["notmovestr"]){
      document.getElementById("algoFunc").getElementsByTagName("div")[0].style.backgroundColor = color
    }
    if(ahoCorasik.statusarr[state]["result"] && !ahoCorasik.statusarr[state]["notmovestr"]){
      document.getElementById("algoFind").getElementsByTagName("div")[8].style.backgroundColor = color
    }
    if(ahoCorasik.statusarr[state]["vertex"]){
      document.getElementById("algoFind").getElementsByTagName("div")[4].style.backgroundColor = color
    }
    if(ahoCorasik.statusarr[state]["check_vertex"]){
      document.getElementById("algoFind").getElementsByTagName("div")[7].style.backgroundColor = color
    }
    if(ahoCorasik.statusarr[state]["get_link"]){
      document.getElementById("algoFunc").getElementsByTagName("div")[6].style.backgroundColor = color
    }
    if(ahoCorasik.statusarr[state]["update_link_from_parent"]){
      document.getElementById("algoFunc").getElementsByTagName("div")[11].style.backgroundColor = color
    }
    if(ahoCorasik.statusarr[state]["return_link"]){
      document.getElementById("algoFunc").getElementsByTagName("div")[12].style.backgroundColor = color
    }
    if(ahoCorasik.statusarr[state]["go_by_link"]){
      document.getElementById("algoFunc").getElementsByTagName("div")[5].style.backgroundColor = color
    }
    return 0
}

function showState(){
  setProgress(100.*state/ahoCorasik.statusarr.length)
  console.log(state, ahoCorasik.statusarr[state])
  selectAlgo(state-2,"")
  selectAlgo(state+1,"")
  selectAlgo(state-1,"rgb(156, 128, 234)")
  selectAlgo(state,"#ff0")
  if(state === ahoCorasik.statusarr.length)
    document.getElementById("operation").innerHTML = makeRes()
  else {
    if(ahoCorasik.statusarr[state]["id"] && !ahoCorasik.statusarr[state]["notmovestr"]){
      console.log("id")
      selectSymbolStr(ahoCorasik.statusarr[state]["id"],"#ff0")
      nowindex = ahoCorasik.statusarr[state]["id"]
    }
    if(ahoCorasik.statusarr[state]["try_to_go_next"] && !ahoCorasik.statusarr[state]["notmovestr"]){
      console.log("try_to_go_next")
      document.getElementById("operation").innerHTML = `v = go(v,c) <br/>
      Пытаемся перейти из текущей найденой подстроки в наидлиннейший префикс искомых подстрок, содержащий максимальный суффикс текущей подстроки с добавлением к нему символа "${ahoCorasik.statusarr[state]["symb"]}" в конец.`
      // markedSubStr.push([ahoCorasik.statusarr[state]["check_vertex"].stringid,ahoCorasik.statusarr[state]["check_vertex"].stringelid])
      // console.log(ahoCorasik.statusarr[state]["try_to_go_next"],ahoCorasik.statusarr[state]["symb"])
      selectSymbolSubStr(ahoCorasik.statusarr[state]["try_to_go_next"],"rgba(230, 19, 19, 0.64)")
      selectSymbolStr(nowindex,"#f00",2,"#ff0")
    }
    if(ahoCorasik.statusarr[state]["result"] && !ahoCorasik.statusarr[state]["notmovestr"]){
      console.log("result")
      document.getElementById("operation").innerHTML = `addRes(pv) <br/>
      Символ pv является концом подстроки ${ahoCorasik.statusarr[state]["result"]}, начиная с позиции ${ahoCorasik.statusarr[state]["pos"]}.`
      // markedSubStr.push([ahoCorasik.statusarr[state]["check_vertex"].stringid,ahoCorasik.statusarr[state]["check_vertex"].stringelid])
      selectSymbolStr(ahoCorasik.statusarr[state]["pos"],"#00ff28",ahoCorasik.statusarr[state]["result"].length)
    }
    if(ahoCorasik.statusarr[state]["vertex"]){
      console.log("vertex")
      document.getElementById("operation").innerHTML = `v = go(v, nextSymb) <br/>
      Перешли на текущий символ, далее будет произведена проверка на наличие подстрок, оканчивающимся в данном символе строки. `
      // markedSubStr = []
      // markedSubStr.push([ahoCorasik.statusarr[state]["vertex"].stringid,ahoCorasik.statusarr[state]["vertex"].stringelid])
      selectSymbolSubStr(ahoCorasik.statusarr[state]["vertex"],"#ff0")
    }
    if(ahoCorasik.statusarr[state]["check_vertex"]){
      console.log("check_vertex")
      document.getElementById("operation").innerHTML = `if(checkIsList(pv)): <br/>&nbsp&nbsp addRes(pv) <br/>&nbsp&nbsp pv = getLink(pv) <br/>
      Проверяем что символ pv не является концом одной из подстрок, после чего переходим по ссылке данного символа для того, чтобы сравнить суффиксы данной подстроки с её же префиксами из искомых подстрок. `
      // markedSubStr.push([ahoCorasik.statusarr[state]["check_vertex"].stringid,ahoCorasik.statusarr[state]["check_vertex"].stringelid])
      selectSymbolSubStr(ahoCorasik.statusarr[state]["check_vertex"],"rgba(230, 19, 19, 0.64)")
    }
    if(ahoCorasik.statusarr[state]["get_link"]){
      console.log("get_link")
      document.getElementById("operation").innerHTML = `v = getLink(v) <br/>
      Пытаемся получить ссылку на наидлиннейший префикс из всех искомых подстрок, являющийся наидлиннейшим суффиксом данной строки.`
      // markedSubStr.push([ahoCorasik.statusarr[state]["check_vertex"].stringid,ahoCorasik.statusarr[state]["check_vertex"].stringelid])
      selectSymbolSubStr(ahoCorasik.statusarr[state]["get_link"],"rgba(230, 19, 19, 0.64)")
    }
    if(ahoCorasik.statusarr[state]["update_link_from_parent"]){
      console.log("update_link_from_parent")
      document.getElementById("operation").innerHTML = `v.link = go(getLink(t[v].parent), t[v].symb) <br/>
      Пытаемся построить ссылку на наидлиннейший префикс из всех искомых подстрок, являющийся наидлиннейшим суффиксом данной строки, для текущего символа как наидлиннейший суффикс подстроки (get_link), оканчивающейся в его предке (t[v].p), из которого делаем переход (go) на символ, хранимый в текущей вершине (t[v].pch).`
      // markedSubStr.push([ahoCorasik.statusarr[state]["check_vertex"].stringid,ahoCorasik.statusarr[state]["check_vertex"].stringelid])
      selectSymbolSubStrP(ahoCorasik.statusarr[state]["update_link_from_parent"], 
        ahoCorasik.t[ahoCorasik.statusarr[state]["update_link_from_parent"].p], "#ff0","rgba(230, 19, 19, 0.64)")
    }
    if(ahoCorasik.statusarr[state]["return_link"]){
      console.log("return_link")
      document.getElementById("operation").innerHTML = `return v.link <br/>
      Возвращаем ссылку на наидлиннейший префикс из всех искомых подстрок, являющийся наидлиннейшим суффиксом данной строки.`
      // markedSubStr.push([ahoCorasik.statusarr[state]["check_vertex"].stringid,ahoCorasik.statusarr[state]["check_vertex"].stringelid])
      selectSymbolSubStr(ahoCorasik.statusarr[state]["return_link"],"rgba(230, 19, 19, 0.64)")
    }
    if(ahoCorasik.statusarr[state]["go_by_link"]){
      console.log("go_by_link")
      document.getElementById("operation").innerHTML = `return v == 0 ? 0 : go(getLink(v), c) <br/>
      Если переход ещё не построен, и мы находимся в нулевой вершине, то тогда не существует искомой подстроки, начинающейся с данного символа и мы должны остаться в нулевой вершине, <br/>
      Иначе переходим по ссылке на наидлиннейший суффикс данной подстроки и пытаемся перейти на следующий символ уже из неё.`
      // markedSubStr.push([ahoCorasik.statusarr[state]["check_vertex"].stringid,ahoCorasik.statusarr[state]["check_vertex"].stringelid])
      selectSymbolSubStr(ahoCorasik.statusarr[state]["go_by_link"],"rgba(230, 19, 19, 0.64)")
    }
    if(state == 0){
      selectSymbolStr(0,"#ff0")
    }
  }
}