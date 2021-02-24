/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{254:function(e,t,r){var n,o;!function(){var l,c,h,d,f,y,m,x,v,w,k,Q,S,E,L,P,T,_,O,I,R,C,F,N,j,A,D=function(e){var t=new D.Builder;return t.pipeline.add(D.trimmer,D.stopWordFilter,D.stemmer),t.searchPipeline.add(D.stemmer),e.call(t,t),t.build()};D.version="2.3.9",D.utils={},D.utils.warn=(l=this,function(e){l.console&&console.warn&&console.warn(e)}),D.utils.asString=function(e){return null==e?"":e.toString()},D.utils.clone=function(e){if(null==e)return e;for(var t=Object.create(null),r=Object.keys(e),i=0;i<r.length;i++){var n=r[i],o=e[n];if(Array.isArray(o))t[n]=o.slice();else{if("string"!=typeof o&&"number"!=typeof o&&"boolean"!=typeof o)throw new TypeError("clone is not deep and does not support nested objects");t[n]=o}}return t},D.FieldRef=function(e,t,r){this.docRef=e,this.fieldName=t,this._stringValue=r},D.FieldRef.joiner="/",D.FieldRef.fromString=function(s){var e=s.indexOf(D.FieldRef.joiner);if(-1===e)throw"malformed field ref string";var t=s.slice(0,e),r=s.slice(e+1);return new D.FieldRef(r,t,s)},D.FieldRef.prototype.toString=function(){return null==this._stringValue&&(this._stringValue=this.fieldName+D.FieldRef.joiner+this.docRef),this._stringValue},D.Set=function(e){if(this.elements=Object.create(null),e){this.length=e.length;for(var i=0;i<this.length;i++)this.elements[e[i]]=!0}else this.length=0},D.Set.complete={intersect:function(e){return e},union:function(){return this},contains:function(){return!0}},D.Set.empty={intersect:function(){return this},union:function(e){return e},contains:function(){return!1}},D.Set.prototype.contains=function(object){return!!this.elements[object]},D.Set.prototype.intersect=function(e){var a,b,t,r=[];if(e===D.Set.complete)return this;if(e===D.Set.empty)return e;this.length<e.length?(a=this,b=e):(a=e,b=this),t=Object.keys(a.elements);for(var i=0;i<t.length;i++){var element=t[i];element in b.elements&&r.push(element)}return new D.Set(r)},D.Set.prototype.union=function(e){return e===D.Set.complete?D.Set.complete:e===D.Set.empty?this:new D.Set(Object.keys(this.elements).concat(Object.keys(e.elements)))},D.idf=function(e,t){var r=0;for(var n in e)"_index"!=n&&(r+=Object.keys(e[n]).length);var o=(t-r+.5)/(r+.5);return Math.log(1+Math.abs(o))},D.Token=function(e,t){this.str=e||"",this.metadata=t||{}},D.Token.prototype.toString=function(){return this.str},D.Token.prototype.update=function(e){return this.str=e(this.str,this.metadata),this},D.Token.prototype.clone=function(e){return e=e||function(s){return s},new D.Token(e(this.str,this.metadata),this.metadata)},D.tokenizer=function(e,t){if(null==e||null==e)return[];if(Array.isArray(e))return e.map((function(e){return new D.Token(D.utils.asString(e).toLowerCase(),D.utils.clone(t))}));for(var r=e.toString().toLowerCase(),n=r.length,o=[],l=0,c=0;l<=n;l++){var h=l-c;if(r.charAt(l).match(D.tokenizer.separator)||l==n){if(h>0){var d=D.utils.clone(t)||{};d.position=[c,h],d.index=o.length,o.push(new D.Token(r.slice(c,l),d))}c=l+1}}return o},D.tokenizer.separator=/[\s\-]+/,D.Pipeline=function(){this._stack=[]},D.Pipeline.registeredFunctions=Object.create(null),D.Pipeline.registerFunction=function(e,label){label in this.registeredFunctions&&D.utils.warn("Overwriting existing registered function: "+label),e.label=label,D.Pipeline.registeredFunctions[e.label]=e},D.Pipeline.warnIfFunctionNotRegistered=function(e){e.label&&e.label in this.registeredFunctions||D.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n",e)},D.Pipeline.load=function(e){var t=new D.Pipeline;return e.forEach((function(e){var r=D.Pipeline.registeredFunctions[e];if(!r)throw new Error("Cannot load unregistered function: "+e);t.add(r)})),t},D.Pipeline.prototype.add=function(){var e=Array.prototype.slice.call(arguments);e.forEach((function(e){D.Pipeline.warnIfFunctionNotRegistered(e),this._stack.push(e)}),this)},D.Pipeline.prototype.after=function(e,t){D.Pipeline.warnIfFunctionNotRegistered(t);var r=this._stack.indexOf(e);if(-1==r)throw new Error("Cannot find existingFn");r+=1,this._stack.splice(r,0,t)},D.Pipeline.prototype.before=function(e,t){D.Pipeline.warnIfFunctionNotRegistered(t);var r=this._stack.indexOf(e);if(-1==r)throw new Error("Cannot find existingFn");this._stack.splice(r,0,t)},D.Pipeline.prototype.remove=function(e){var t=this._stack.indexOf(e);-1!=t&&this._stack.splice(t,1)},D.Pipeline.prototype.run=function(e){for(var t=this._stack.length,i=0;i<t;i++){for(var r=this._stack[i],n=[],o=0;o<e.length;o++){var l=r(e[o],o,e);if(null!=l&&""!==l)if(Array.isArray(l))for(var c=0;c<l.length;c++)n.push(l[c]);else n.push(l)}e=n}return e},D.Pipeline.prototype.runString=function(e,t){var r=new D.Token(e,t);return this.run([r]).map((function(e){return e.toString()}))},D.Pipeline.prototype.reset=function(){this._stack=[]},D.Pipeline.prototype.toJSON=function(){return this._stack.map((function(e){return D.Pipeline.warnIfFunctionNotRegistered(e),e.label}))},D.Vector=function(e){this._magnitude=0,this.elements=e||[]},D.Vector.prototype.positionForIndex=function(e){if(0==this.elements.length)return 0;for(var t=0,r=this.elements.length/2,n=r-t,o=Math.floor(n/2),l=this.elements[2*o];n>1&&(l<e&&(t=o),l>e&&(r=o),l!=e);)n=r-t,o=t+Math.floor(n/2),l=this.elements[2*o];return l==e||l>e?2*o:l<e?2*(o+1):void 0},D.Vector.prototype.insert=function(e,t){this.upsert(e,t,(function(){throw"duplicate index"}))},D.Vector.prototype.upsert=function(e,t,r){this._magnitude=0;var n=this.positionForIndex(e);this.elements[n]==e?this.elements[n+1]=r(this.elements[n+1],t):this.elements.splice(n,0,e,t)},D.Vector.prototype.magnitude=function(){if(this._magnitude)return this._magnitude;for(var e=0,t=this.elements.length,i=1;i<t;i+=2){var r=this.elements[i];e+=r*r}return this._magnitude=Math.sqrt(e)},D.Vector.prototype.dot=function(e){for(var t=0,a=this.elements,b=e.elements,r=a.length,n=b.length,o=0,l=0,i=0,c=0;i<r&&c<n;)(o=a[i])<(l=b[c])?i+=2:o>l?c+=2:o==l&&(t+=a[i+1]*b[c+1],i+=2,c+=2);return t},D.Vector.prototype.similarity=function(e){return this.dot(e)/this.magnitude()||0},D.Vector.prototype.toArray=function(){for(var output=new Array(this.elements.length/2),i=1,e=0;i<this.elements.length;i+=2,e++)output[e]=this.elements[i];return output},D.Vector.prototype.toJSON=function(){return this.elements},D.stemmer=(c={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},h={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},d="[aeiouy]",f="[^aeiou][^aeiouy]*",y=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*"),m=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*"),x=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*([aeiouy][aeiou]*)?$"),v=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy]"),w=/^(.+?)(ss|i)es$/,k=/^(.+?)([^s])s$/,Q=/^(.+?)eed$/,S=/^(.+?)(ed|ing)$/,E=/.$/,L=/(at|bl|iz)$/,P=new RegExp("([^aeiouylsz])\\1$"),T=new RegExp("^"+f+d+"[^aeiouwxy]$"),_=/^(.+?[^aeiou])y$/,O=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,I=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,R=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,C=/^(.+?)(s|t)(ion)$/,F=/^(.+?)e$/,N=/ll$/,j=new RegExp("^"+f+d+"[^aeiouwxy]$"),A=function(e){var t,r,n,o,l,d,f;if(e.length<3)return e;if("y"==(n=e.substr(0,1))&&(e=n.toUpperCase()+e.substr(1)),l=k,(o=w).test(e)?e=e.replace(o,"$1$2"):l.test(e)&&(e=e.replace(l,"$1$2")),l=S,(o=Q).test(e)){var A=o.exec(e);(o=y).test(A[1])&&(o=E,e=e.replace(o,""))}else l.test(e)&&(t=(A=l.exec(e))[1],(l=v).test(t)&&(d=P,f=T,(l=L).test(e=t)?e+="e":d.test(e)?(o=E,e=e.replace(o,"")):f.test(e)&&(e+="e")));return(o=_).test(e)&&(e=(t=(A=o.exec(e))[1])+"i"),(o=O).test(e)&&(t=(A=o.exec(e))[1],r=A[2],(o=y).test(t)&&(e=t+c[r])),(o=I).test(e)&&(t=(A=o.exec(e))[1],r=A[2],(o=y).test(t)&&(e=t+h[r])),l=C,(o=R).test(e)?(t=(A=o.exec(e))[1],(o=m).test(t)&&(e=t)):l.test(e)&&(t=(A=l.exec(e))[1]+A[2],(l=m).test(t)&&(e=t)),(o=F).test(e)&&(t=(A=o.exec(e))[1],l=x,d=j,((o=m).test(t)||l.test(t)&&!d.test(t))&&(e=t)),l=m,(o=N).test(e)&&l.test(e)&&(o=E,e=e.replace(o,"")),"y"==n&&(e=n.toLowerCase()+e.substr(1)),e},function(e){return e.update(A)}),D.Pipeline.registerFunction(D.stemmer,"stemmer"),D.generateStopWordFilter=function(e){var t=e.reduce((function(e,t){return e[t]=t,e}),{});return function(e){if(e&&t[e.toString()]!==e.toString())return e}},D.stopWordFilter=D.generateStopWordFilter(["a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"]),D.Pipeline.registerFunction(D.stopWordFilter,"stopWordFilter"),D.trimmer=function(e){return e.update((function(s){return s.replace(/^\W+/,"").replace(/\W+$/,"")}))},D.Pipeline.registerFunction(D.trimmer,"trimmer"),D.TokenSet=function(){this.final=!1,this.edges={},this.id=D.TokenSet._nextId,D.TokenSet._nextId+=1},D.TokenSet._nextId=1,D.TokenSet.fromArray=function(e){for(var t=new D.TokenSet.Builder,i=0,r=e.length;i<r;i++)t.insert(e[i]);return t.finish(),t.root},D.TokenSet.fromClause=function(e){return"editDistance"in e?D.TokenSet.fromFuzzyString(e.term,e.editDistance):D.TokenSet.fromString(e.term)},D.TokenSet.fromFuzzyString=function(e,t){for(var r=new D.TokenSet,n=[{node:r,editsRemaining:t,str:e}];n.length;){var o=n.pop();if(o.str.length>0){var l,c=o.str.charAt(0);c in o.node.edges?l=o.node.edges[c]:(l=new D.TokenSet,o.node.edges[c]=l),1==o.str.length&&(l.final=!0),n.push({node:l,editsRemaining:o.editsRemaining,str:o.str.slice(1)})}if(0!=o.editsRemaining){if("*"in o.node.edges)var h=o.node.edges["*"];else{h=new D.TokenSet;o.node.edges["*"]=h}if(0==o.str.length&&(h.final=!0),n.push({node:h,editsRemaining:o.editsRemaining-1,str:o.str}),o.str.length>1&&n.push({node:o.node,editsRemaining:o.editsRemaining-1,str:o.str.slice(1)}),1==o.str.length&&(o.node.final=!0),o.str.length>=1){if("*"in o.node.edges)var d=o.node.edges["*"];else{d=new D.TokenSet;o.node.edges["*"]=d}1==o.str.length&&(d.final=!0),n.push({node:d,editsRemaining:o.editsRemaining-1,str:o.str.slice(1)})}if(o.str.length>1){var f,y=o.str.charAt(0),m=o.str.charAt(1);m in o.node.edges?f=o.node.edges[m]:(f=new D.TokenSet,o.node.edges[m]=f),1==o.str.length&&(f.final=!0),n.push({node:f,editsRemaining:o.editsRemaining-1,str:y+o.str.slice(2)})}}}return r},D.TokenSet.fromString=function(e){for(var t=new D.TokenSet,r=t,i=0,n=e.length;i<n;i++){var o=e[i],l=i==n-1;if("*"==o)t.edges[o]=t,t.final=l;else{var c=new D.TokenSet;c.final=l,t.edges[o]=c,t=c}}return r},D.TokenSet.prototype.toArray=function(){for(var e=[],t=[{prefix:"",node:this}];t.length;){var r=t.pop(),n=Object.keys(r.node.edges),o=n.length;r.node.final&&(r.prefix.charAt(0),e.push(r.prefix));for(var i=0;i<o;i++){var l=n[i];t.push({prefix:r.prefix.concat(l),node:r.node.edges[l]})}}return e},D.TokenSet.prototype.toString=function(){if(this._str)return this._str;for(var e=this.final?"1":"0",t=Object.keys(this.edges).sort(),r=t.length,i=0;i<r;i++){var label=t[i];e=e+label+this.edges[label].id}return e},D.TokenSet.prototype.intersect=function(b){for(var output=new D.TokenSet,e=void 0,t=[{qNode:b,output:output,node:this}];t.length;){e=t.pop();for(var r=Object.keys(e.qNode.edges),n=r.length,o=Object.keys(e.node.edges),l=o.length,q=0;q<n;q++)for(var c=r[q],h=0;h<l;h++){var d=o[h];if(d==c||"*"==c){var f=e.node.edges[d],y=e.qNode.edges[c],m=f.final&&y.final,x=void 0;d in e.output.edges?(x=e.output.edges[d]).final=x.final||m:((x=new D.TokenSet).final=m,e.output.edges[d]=x),t.push({qNode:y,output:x,node:f})}}}return output},D.TokenSet.Builder=function(){this.previousWord="",this.root=new D.TokenSet,this.uncheckedNodes=[],this.minimizedNodes={}},D.TokenSet.Builder.prototype.insert=function(e){var t,r=0;if(e<this.previousWord)throw new Error("Out of order word insertion");for(var i=0;i<e.length&&i<this.previousWord.length&&e[i]==this.previousWord[i];i++)r++;this.minimize(r),t=0==this.uncheckedNodes.length?this.root:this.uncheckedNodes[this.uncheckedNodes.length-1].child;for(i=r;i<e.length;i++){var n=new D.TokenSet,o=e[i];t.edges[o]=n,this.uncheckedNodes.push({parent:t,char:o,child:n}),t=n}t.final=!0,this.previousWord=e},D.TokenSet.Builder.prototype.finish=function(){this.minimize(0)},D.TokenSet.Builder.prototype.minimize=function(e){for(var i=this.uncheckedNodes.length-1;i>=e;i--){var t=this.uncheckedNodes[i],r=t.child.toString();r in this.minimizedNodes?t.parent.edges[t.char]=this.minimizedNodes[r]:(t.child._str=r,this.minimizedNodes[r]=t.child),this.uncheckedNodes.pop()}},D.Index=function(e){this.invertedIndex=e.invertedIndex,this.fieldVectors=e.fieldVectors,this.tokenSet=e.tokenSet,this.fields=e.fields,this.pipeline=e.pipeline},D.Index.prototype.search=function(e){return this.query((function(t){new D.QueryParser(e,t).parse()}))},D.Index.prototype.query=function(e){for(var t=new D.Query(this.fields),r=Object.create(null),n=Object.create(null),o=Object.create(null),l=Object.create(null),c=Object.create(null),i=0;i<this.fields.length;i++)n[this.fields[i]]=new D.Vector;e.call(t,t);for(i=0;i<t.clauses.length;i++){var h=t.clauses[i],d=null,f=D.Set.empty;d=h.usePipeline?this.pipeline.runString(h.term,{fields:h.fields}):[h.term];for(var y=0;y<d.length;y++){var m=d[y];h.term=m;var x=D.TokenSet.fromClause(h),v=this.tokenSet.intersect(x).toArray();if(0===v.length&&h.presence===D.Query.presence.REQUIRED){for(var w=0;w<h.fields.length;w++){l[A=h.fields[w]]=D.Set.empty}break}for(var k=0;k<v.length;k++){var Q=v[k],S=this.invertedIndex[Q],E=S._index;for(w=0;w<h.fields.length;w++){var L=S[A=h.fields[w]],P=Object.keys(L),T=Q+"/"+A,_=new D.Set(P);if(h.presence==D.Query.presence.REQUIRED&&(f=f.union(_),void 0===l[A]&&(l[A]=D.Set.complete)),h.presence!=D.Query.presence.PROHIBITED){if(n[A].upsert(E,h.boost,(function(a,b){return a+b})),!o[T]){for(var O=0;O<P.length;O++){var I,R=P[O],C=new D.FieldRef(R,A),F=L[R];void 0===(I=r[C])?r[C]=new D.MatchData(Q,A,F):I.add(Q,A,F)}o[T]=!0}}else void 0===c[A]&&(c[A]=D.Set.empty),c[A]=c[A].union(_)}}}if(h.presence===D.Query.presence.REQUIRED)for(w=0;w<h.fields.length;w++){l[A=h.fields[w]]=l[A].intersect(f)}}var N=D.Set.complete,j=D.Set.empty;for(i=0;i<this.fields.length;i++){var A;l[A=this.fields[i]]&&(N=N.intersect(l[A])),c[A]&&(j=j.union(c[A]))}var z=Object.keys(r),B=[],V=Object.create(null);if(t.isNegated()){z=Object.keys(this.fieldVectors);for(i=0;i<z.length;i++){C=z[i];var M=D.FieldRef.fromString(C);r[C]=new D.MatchData}}for(i=0;i<z.length;i++){var $=(M=D.FieldRef.fromString(z[i])).docRef;if(N.contains($)&&!j.contains($)){var W,U=this.fieldVectors[M],J=n[M.fieldName].similarity(U);if(void 0!==(W=V[$]))W.score+=J,W.matchData.combine(r[M]);else{var G={ref:$,score:J,matchData:r[M]};V[$]=G,B.push(G)}}}return B.sort((function(a,b){return b.score-a.score}))},D.Index.prototype.toJSON=function(){var e=Object.keys(this.invertedIndex).sort().map((function(e){return[e,this.invertedIndex[e]]}),this),t=Object.keys(this.fieldVectors).map((function(e){return[e,this.fieldVectors[e].toJSON()]}),this);return{version:D.version,fields:this.fields,fieldVectors:t,invertedIndex:e,pipeline:this.pipeline.toJSON()}},D.Index.load=function(e){var t={},r={},n=e.fieldVectors,o=Object.create(null),l=e.invertedIndex,c=new D.TokenSet.Builder,h=D.Pipeline.load(e.pipeline);e.version!=D.version&&D.utils.warn("Version mismatch when loading serialised index. Current version of lunr '"+D.version+"' does not match serialized index '"+e.version+"'");for(var i=0;i<n.length;i++){var d=(y=n[i])[0],f=y[1];r[d]=new D.Vector(f)}for(i=0;i<l.length;i++){var y,m=(y=l[i])[0],x=y[1];c.insert(m),o[m]=x}return c.finish(),t.fields=e.fields,t.fieldVectors=r,t.invertedIndex=o,t.tokenSet=c.root,t.pipeline=h,new D.Index(t)},D.Builder=function(){this._ref="id",this._fields=Object.create(null),this._documents=Object.create(null),this.invertedIndex=Object.create(null),this.fieldTermFrequencies={},this.fieldLengths={},this.tokenizer=D.tokenizer,this.pipeline=new D.Pipeline,this.searchPipeline=new D.Pipeline,this.documentCount=0,this._b=.75,this._k1=1.2,this.termIndex=0,this.metadataWhitelist=[]},D.Builder.prototype.ref=function(e){this._ref=e},D.Builder.prototype.field=function(e,t){if(/\//.test(e))throw new RangeError("Field '"+e+"' contains illegal character '/'");this._fields[e]=t||{}},D.Builder.prototype.b=function(e){this._b=e<0?0:e>1?1:e},D.Builder.prototype.k1=function(e){this._k1=e},D.Builder.prototype.add=function(e,t){var r=e[this._ref],n=Object.keys(this._fields);this._documents[r]=t||{},this.documentCount+=1;for(var i=0;i<n.length;i++){var o=n[i],l=this._fields[o].extractor,c=l?l(e):e[o],h=this.tokenizer(c,{fields:[o]}),d=this.pipeline.run(h),f=new D.FieldRef(r,o),y=Object.create(null);this.fieldTermFrequencies[f]=y,this.fieldLengths[f]=0,this.fieldLengths[f]+=d.length;for(var m=0;m<d.length;m++){var x=d[m];if(null==y[x]&&(y[x]=0),y[x]+=1,null==this.invertedIndex[x]){var v=Object.create(null);v._index=this.termIndex,this.termIndex+=1;for(var w=0;w<n.length;w++)v[n[w]]=Object.create(null);this.invertedIndex[x]=v}null==this.invertedIndex[x][o][r]&&(this.invertedIndex[x][o][r]=Object.create(null));for(var k=0;k<this.metadataWhitelist.length;k++){var Q=this.metadataWhitelist[k],S=x.metadata[Q];null==this.invertedIndex[x][o][r][Q]&&(this.invertedIndex[x][o][r][Q]=[]),this.invertedIndex[x][o][r][Q].push(S)}}}},D.Builder.prototype.calculateAverageFieldLengths=function(){for(var e=Object.keys(this.fieldLengths),t=e.length,r={},n={},i=0;i<t;i++){var o=D.FieldRef.fromString(e[i]),l=o.fieldName;n[l]||(n[l]=0),n[l]+=1,r[l]||(r[l]=0),r[l]+=this.fieldLengths[o]}var c=Object.keys(this._fields);for(i=0;i<c.length;i++){var h=c[i];r[h]=r[h]/n[h]}this.averageFieldLength=r},D.Builder.prototype.createFieldVectors=function(){for(var e={},t=Object.keys(this.fieldTermFrequencies),r=t.length,n=Object.create(null),i=0;i<r;i++){for(var o=D.FieldRef.fromString(t[i]),l=o.fieldName,c=this.fieldLengths[o],h=new D.Vector,d=this.fieldTermFrequencies[o],f=Object.keys(d),y=f.length,m=this._fields[l].boost||1,x=this._documents[o.docRef].boost||1,v=0;v<y;v++){var w,k,Q,S=f[v],E=d[S],L=this.invertedIndex[S]._index;void 0===n[S]?(w=D.idf(this.invertedIndex[S],this.documentCount),n[S]=w):w=n[S],k=w*((this._k1+1)*E)/(this._k1*(1-this._b+this._b*(c/this.averageFieldLength[l]))+E),k*=m,k*=x,Q=Math.round(1e3*k)/1e3,h.insert(L,Q)}e[o]=h}this.fieldVectors=e},D.Builder.prototype.createTokenSet=function(){this.tokenSet=D.TokenSet.fromArray(Object.keys(this.invertedIndex).sort())},D.Builder.prototype.build=function(){return this.calculateAverageFieldLengths(),this.createFieldVectors(),this.createTokenSet(),new D.Index({invertedIndex:this.invertedIndex,fieldVectors:this.fieldVectors,tokenSet:this.tokenSet,fields:Object.keys(this._fields),pipeline:this.searchPipeline})},D.Builder.prototype.use=function(e){var t=Array.prototype.slice.call(arguments,1);t.unshift(this),e.apply(this,t)},D.MatchData=function(e,t,r){for(var n=Object.create(null),o=Object.keys(r||{}),i=0;i<o.length;i++){var l=o[i];n[l]=r[l].slice()}this.metadata=Object.create(null),void 0!==e&&(this.metadata[e]=Object.create(null),this.metadata[e][t]=n)},D.MatchData.prototype.combine=function(e){for(var t=Object.keys(e.metadata),i=0;i<t.length;i++){var r=t[i],n=Object.keys(e.metadata[r]);null==this.metadata[r]&&(this.metadata[r]=Object.create(null));for(var o=0;o<n.length;o++){var l=n[o],c=Object.keys(e.metadata[r][l]);null==this.metadata[r][l]&&(this.metadata[r][l]=Object.create(null));for(var h=0;h<c.length;h++){var d=c[h];null==this.metadata[r][l][d]?this.metadata[r][l][d]=e.metadata[r][l][d]:this.metadata[r][l][d]=this.metadata[r][l][d].concat(e.metadata[r][l][d])}}}},D.MatchData.prototype.add=function(e,t,r){if(!(e in this.metadata))return this.metadata[e]=Object.create(null),void(this.metadata[e][t]=r);if(t in this.metadata[e])for(var n=Object.keys(r),i=0;i<n.length;i++){var o=n[i];o in this.metadata[e][t]?this.metadata[e][t][o]=this.metadata[e][t][o].concat(r[o]):this.metadata[e][t][o]=r[o]}else this.metadata[e][t]=r},D.Query=function(e){this.clauses=[],this.allFields=e},D.Query.wildcard=new String("*"),D.Query.wildcard.NONE=0,D.Query.wildcard.LEADING=1,D.Query.wildcard.TRAILING=2,D.Query.presence={OPTIONAL:1,REQUIRED:2,PROHIBITED:3},D.Query.prototype.clause=function(e){return"fields"in e||(e.fields=this.allFields),"boost"in e||(e.boost=1),"usePipeline"in e||(e.usePipeline=!0),"wildcard"in e||(e.wildcard=D.Query.wildcard.NONE),e.wildcard&D.Query.wildcard.LEADING&&e.term.charAt(0)!=D.Query.wildcard&&(e.term="*"+e.term),e.wildcard&D.Query.wildcard.TRAILING&&e.term.slice(-1)!=D.Query.wildcard&&(e.term=e.term+"*"),"presence"in e||(e.presence=D.Query.presence.OPTIONAL),this.clauses.push(e),this},D.Query.prototype.isNegated=function(){for(var i=0;i<this.clauses.length;i++)if(this.clauses[i].presence!=D.Query.presence.PROHIBITED)return!1;return!0},D.Query.prototype.term=function(e,t){if(Array.isArray(e))return e.forEach((function(e){this.term(e,D.utils.clone(t))}),this),this;var r=t||{};return r.term=e.toString(),this.clause(r),this},D.QueryParseError=function(e,t,r){this.name="QueryParseError",this.message=e,this.start=t,this.end=r},D.QueryParseError.prototype=new Error,D.QueryLexer=function(e){this.lexemes=[],this.str=e,this.length=e.length,this.pos=0,this.start=0,this.escapeCharPositions=[]},D.QueryLexer.prototype.run=function(){for(var e=D.QueryLexer.lexText;e;)e=e(this)},D.QueryLexer.prototype.sliceString=function(){for(var e=[],t=this.start,r=this.pos,i=0;i<this.escapeCharPositions.length;i++)r=this.escapeCharPositions[i],e.push(this.str.slice(t,r)),t=r+1;return e.push(this.str.slice(t,this.pos)),this.escapeCharPositions.length=0,e.join("")},D.QueryLexer.prototype.emit=function(e){this.lexemes.push({type:e,str:this.sliceString(),start:this.start,end:this.pos}),this.start=this.pos},D.QueryLexer.prototype.escapeCharacter=function(){this.escapeCharPositions.push(this.pos-1),this.pos+=1},D.QueryLexer.prototype.next=function(){if(this.pos>=this.length)return D.QueryLexer.EOS;var e=this.str.charAt(this.pos);return this.pos+=1,e},D.QueryLexer.prototype.width=function(){return this.pos-this.start},D.QueryLexer.prototype.ignore=function(){this.start==this.pos&&(this.pos+=1),this.start=this.pos},D.QueryLexer.prototype.backup=function(){this.pos-=1},D.QueryLexer.prototype.acceptDigitRun=function(){var e,t;do{t=(e=this.next()).charCodeAt(0)}while(t>47&&t<58);e!=D.QueryLexer.EOS&&this.backup()},D.QueryLexer.prototype.more=function(){return this.pos<this.length},D.QueryLexer.EOS="EOS",D.QueryLexer.FIELD="FIELD",D.QueryLexer.TERM="TERM",D.QueryLexer.EDIT_DISTANCE="EDIT_DISTANCE",D.QueryLexer.BOOST="BOOST",D.QueryLexer.PRESENCE="PRESENCE",D.QueryLexer.lexField=function(e){return e.backup(),e.emit(D.QueryLexer.FIELD),e.ignore(),D.QueryLexer.lexText},D.QueryLexer.lexTerm=function(e){if(e.width()>1&&(e.backup(),e.emit(D.QueryLexer.TERM)),e.ignore(),e.more())return D.QueryLexer.lexText},D.QueryLexer.lexEditDistance=function(e){return e.ignore(),e.acceptDigitRun(),e.emit(D.QueryLexer.EDIT_DISTANCE),D.QueryLexer.lexText},D.QueryLexer.lexBoost=function(e){return e.ignore(),e.acceptDigitRun(),e.emit(D.QueryLexer.BOOST),D.QueryLexer.lexText},D.QueryLexer.lexEOS=function(e){e.width()>0&&e.emit(D.QueryLexer.TERM)},D.QueryLexer.termSeparator=D.tokenizer.separator,D.QueryLexer.lexText=function(e){for(;;){var t=e.next();if(t==D.QueryLexer.EOS)return D.QueryLexer.lexEOS;if(92!=t.charCodeAt(0)){if(":"==t)return D.QueryLexer.lexField;if("~"==t)return e.backup(),e.width()>0&&e.emit(D.QueryLexer.TERM),D.QueryLexer.lexEditDistance;if("^"==t)return e.backup(),e.width()>0&&e.emit(D.QueryLexer.TERM),D.QueryLexer.lexBoost;if("+"==t&&1===e.width())return e.emit(D.QueryLexer.PRESENCE),D.QueryLexer.lexText;if("-"==t&&1===e.width())return e.emit(D.QueryLexer.PRESENCE),D.QueryLexer.lexText;if(t.match(D.QueryLexer.termSeparator))return D.QueryLexer.lexTerm}else e.escapeCharacter()}},D.QueryParser=function(e,t){this.lexer=new D.QueryLexer(e),this.query=t,this.currentClause={},this.lexemeIdx=0},D.QueryParser.prototype.parse=function(){this.lexer.run(),this.lexemes=this.lexer.lexemes;for(var e=D.QueryParser.parseClause;e;)e=e(this);return this.query},D.QueryParser.prototype.peekLexeme=function(){return this.lexemes[this.lexemeIdx]},D.QueryParser.prototype.consumeLexeme=function(){var e=this.peekLexeme();return this.lexemeIdx+=1,e},D.QueryParser.prototype.nextClause=function(){var e=this.currentClause;this.query.clause(e),this.currentClause={}},D.QueryParser.parseClause=function(e){var t=e.peekLexeme();if(null!=t)switch(t.type){case D.QueryLexer.PRESENCE:return D.QueryParser.parsePresence;case D.QueryLexer.FIELD:return D.QueryParser.parseField;case D.QueryLexer.TERM:return D.QueryParser.parseTerm;default:var r="expected either a field or a term, found "+t.type;throw t.str.length>=1&&(r+=" with value '"+t.str+"'"),new D.QueryParseError(r,t.start,t.end)}},D.QueryParser.parsePresence=function(e){var t=e.consumeLexeme();if(null!=t){switch(t.str){case"-":e.currentClause.presence=D.Query.presence.PROHIBITED;break;case"+":e.currentClause.presence=D.Query.presence.REQUIRED;break;default:var r="unrecognised presence operator'"+t.str+"'";throw new D.QueryParseError(r,t.start,t.end)}var n=e.peekLexeme();if(null==n){r="expecting term or field, found nothing";throw new D.QueryParseError(r,t.start,t.end)}switch(n.type){case D.QueryLexer.FIELD:return D.QueryParser.parseField;case D.QueryLexer.TERM:return D.QueryParser.parseTerm;default:r="expecting term or field, found '"+n.type+"'";throw new D.QueryParseError(r,n.start,n.end)}}},D.QueryParser.parseField=function(e){var t=e.consumeLexeme();if(null!=t){if(-1==e.query.allFields.indexOf(t.str)){var r=e.query.allFields.map((function(e){return"'"+e+"'"})).join(", "),n="unrecognised field '"+t.str+"', possible fields: "+r;throw new D.QueryParseError(n,t.start,t.end)}e.currentClause.fields=[t.str];var o=e.peekLexeme();if(null==o){n="expecting term, found nothing";throw new D.QueryParseError(n,t.start,t.end)}switch(o.type){case D.QueryLexer.TERM:return D.QueryParser.parseTerm;default:n="expecting term, found '"+o.type+"'";throw new D.QueryParseError(n,o.start,o.end)}}},D.QueryParser.parseTerm=function(e){var t=e.consumeLexeme();if(null!=t){e.currentClause.term=t.str.toLowerCase(),-1!=t.str.indexOf("*")&&(e.currentClause.usePipeline=!1);var r=e.peekLexeme();if(null!=r)switch(r.type){case D.QueryLexer.TERM:return e.nextClause(),D.QueryParser.parseTerm;case D.QueryLexer.FIELD:return e.nextClause(),D.QueryParser.parseField;case D.QueryLexer.EDIT_DISTANCE:return D.QueryParser.parseEditDistance;case D.QueryLexer.BOOST:return D.QueryParser.parseBoost;case D.QueryLexer.PRESENCE:return e.nextClause(),D.QueryParser.parsePresence;default:var n="Unexpected lexeme type '"+r.type+"'";throw new D.QueryParseError(n,r.start,r.end)}else e.nextClause()}},D.QueryParser.parseEditDistance=function(e){var t=e.consumeLexeme();if(null!=t){var r=parseInt(t.str,10);if(isNaN(r)){var n="edit distance must be numeric";throw new D.QueryParseError(n,t.start,t.end)}e.currentClause.editDistance=r;var o=e.peekLexeme();if(null!=o)switch(o.type){case D.QueryLexer.TERM:return e.nextClause(),D.QueryParser.parseTerm;case D.QueryLexer.FIELD:return e.nextClause(),D.QueryParser.parseField;case D.QueryLexer.EDIT_DISTANCE:return D.QueryParser.parseEditDistance;case D.QueryLexer.BOOST:return D.QueryParser.parseBoost;case D.QueryLexer.PRESENCE:return e.nextClause(),D.QueryParser.parsePresence;default:n="Unexpected lexeme type '"+o.type+"'";throw new D.QueryParseError(n,o.start,o.end)}else e.nextClause()}},D.QueryParser.parseBoost=function(e){var t=e.consumeLexeme();if(null!=t){var r=parseInt(t.str,10);if(isNaN(r)){var n="boost must be numeric";throw new D.QueryParseError(n,t.start,t.end)}e.currentClause.boost=r;var o=e.peekLexeme();if(null!=o)switch(o.type){case D.QueryLexer.TERM:return e.nextClause(),D.QueryParser.parseTerm;case D.QueryLexer.FIELD:return e.nextClause(),D.QueryParser.parseField;case D.QueryLexer.EDIT_DISTANCE:return D.QueryParser.parseEditDistance;case D.QueryLexer.BOOST:return D.QueryParser.parseBoost;case D.QueryLexer.PRESENCE:return e.nextClause(),D.QueryParser.parsePresence;default:n="Unexpected lexeme type '"+o.type+"'";throw new D.QueryParseError(n,o.start,o.end)}else e.nextClause()}},void 0===(o="function"==typeof(n=function(){return D})?n.call(t,r,t,e):n)||(e.exports=o)}()},255:function(e,t,r){var n,o;void 0===(o="function"==typeof(n=function(){return function(e){e.stemmerSupport={Among:function(s,e,t,r){if(this.toCharArray=function(s){for(var e=s.length,t=new Array(e),i=0;i<e;i++)t[i]=s.charCodeAt(i);return t},!s&&""!=s||!e&&0!=e||!t)throw"Bad Among initialisation: s:"+s+", substring_i: "+e+", result: "+t;this.s_size=s.length,this.s=this.toCharArray(s),this.substring_i=e,this.result=t,this.method=r},SnowballProgram:function(){var e;return{bra:0,ket:0,limit:0,cursor:0,limit_backward:0,setCurrent:function(t){e=t,this.cursor=0,this.limit=t.length,this.limit_backward=0,this.bra=this.cursor,this.ket=this.limit},getCurrent:function(){var t=e;return e=null,t},in_grouping:function(s,t,r){if(this.cursor<this.limit){var n=e.charCodeAt(this.cursor);if(n<=r&&n>=t&&s[(n-=t)>>3]&1<<(7&n))return this.cursor++,!0}return!1},in_grouping_b:function(s,t,r){if(this.cursor>this.limit_backward){var n=e.charCodeAt(this.cursor-1);if(n<=r&&n>=t&&s[(n-=t)>>3]&1<<(7&n))return this.cursor--,!0}return!1},out_grouping:function(s,t,r){if(this.cursor<this.limit){var n=e.charCodeAt(this.cursor);if(n>r||n<t)return this.cursor++,!0;if(!(s[(n-=t)>>3]&1<<(7&n)))return this.cursor++,!0}return!1},out_grouping_b:function(s,t,r){if(this.cursor>this.limit_backward){var n=e.charCodeAt(this.cursor-1);if(n>r||n<t)return this.cursor--,!0;if(!(s[(n-=t)>>3]&1<<(7&n)))return this.cursor--,!0}return!1},eq_s:function(t,s){if(this.limit-this.cursor<t)return!1;for(var i=0;i<t;i++)if(e.charCodeAt(this.cursor+i)!=s.charCodeAt(i))return!1;return this.cursor+=t,!0},eq_s_b:function(t,s){if(this.cursor-this.limit_backward<t)return!1;for(var i=0;i<t;i++)if(e.charCodeAt(this.cursor-t+i)!=s.charCodeAt(i))return!1;return this.cursor-=t,!0},find_among:function(t,r){for(var i=0,n=r,o=this.cursor,l=this.limit,c=0,h=0,d=!1;;){for(var f=i+(n-i>>1),y=0,m=c<h?c:h,x=t[f],v=m;v<x.s_size;v++){if(o+m==l){y=-1;break}if(y=e.charCodeAt(o+m)-x.s[v])break;m++}if(y<0?(n=f,h=m):(i=f,c=m),n-i<=1){if(i>0||n==i||d)break;d=!0}}for(;;){if(c>=(x=t[i]).s_size){if(this.cursor=o+x.s_size,!x.method)return x.result;var w=x.method();if(this.cursor=o+x.s_size,w)return x.result}if((i=x.substring_i)<0)return 0}},find_among_b:function(t,r){for(var i=0,n=r,o=this.cursor,l=this.limit_backward,c=0,h=0,d=!1;;){for(var f=i+(n-i>>1),y=0,m=c<h?c:h,x=(v=t[f]).s_size-1-m;x>=0;x--){if(o-m==l){y=-1;break}if(y=e.charCodeAt(o-1-m)-v.s[x])break;m++}if(y<0?(n=f,h=m):(i=f,c=m),n-i<=1){if(i>0||n==i||d)break;d=!0}}for(;;){var v;if(c>=(v=t[i]).s_size){if(this.cursor=o-v.s_size,!v.method)return v.result;var w=v.method();if(this.cursor=o-v.s_size,w)return v.result}if((i=v.substring_i)<0)return 0}},replace_s:function(t,r,s){var n=s.length-(r-t),o=e.substring(0,t),l=e.substring(r);return e=o+s+l,this.limit+=n,this.cursor>=r?this.cursor+=n:this.cursor>t&&(this.cursor=t),n},slice_check:function(){if(this.bra<0||this.bra>this.ket||this.ket>this.limit||this.limit>e.length)throw"faulty slice operation"},slice_from:function(s){this.slice_check(),this.replace_s(this.bra,this.ket,s)},slice_del:function(){this.slice_from("")},insert:function(e,t,s){var r=this.replace_s(e,t,s);e<=this.bra&&(this.bra+=r),e<=this.ket&&(this.ket+=r)},slice_to:function(){return this.slice_check(),e.substring(this.bra,this.ket)},eq_v_b:function(s){return this.eq_s_b(s.length,s)}}}},e.trimmerSupport={generateTrimmer:function(e){var t=new RegExp("^[^"+e+"]+"),r=new RegExp("[^"+e+"]+$");return function(e){return"function"==typeof e.update?e.update((function(s){return s.replace(t,"").replace(r,"")})):e.replace(t,"").replace(r,"")}}}}})?n.call(t,r,t,e):n)||(e.exports=o)}}]);