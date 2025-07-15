import{g as I,a as M,r as R,b as j,j as m,s as h,c as U,U as n,d as E,m as C,V as N,a$ as P,b0 as S}from"./index-CGCMCOQF.js";try{let e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},r=new e.Error().stack;r&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[r]="303c467d-d4c6-4e8b-be91-4283242bfbd8",e._sentryDebugIdIdentifier="sentry-dbid-303c467d-d4c6-4e8b-be91-4283242bfbd8")}catch{}function _(e){return I("MuiCircularProgress",e)}M("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const t=44,g=S`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,y=S`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`,F=typeof g!="string"?P`
        animation: ${g} 1.4s linear infinite;
      `:null,T=typeof y!="string"?P`
        animation: ${y} 1.4s ease-in-out infinite;
      `:null,V=e=>{const{classes:r,variant:s,color:a,disableShrink:l}=e,c={root:["root",s,`color${n(a)}`],svg:["svg"],circle:["circle",`circle${n(s)}`,l&&"circleDisableShrink"]};return E(c,_,r)},z=h("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.root,r[s.variant],r[`color${n(s.color)}`]]}})(C(({theme:e})=>({display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("transform")}},{props:{variant:"indeterminate"},style:F||{animation:`${g} 1.4s linear infinite`}},...Object.entries(e.palette).filter(N()).map(([r])=>({props:{color:r},style:{color:(e.vars||e).palette[r].main}}))]}))),A=h("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),K=h("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.circle,r[`circle${n(s.variant)}`],s.disableShrink&&r.circleDisableShrink]}})(C(({theme:e})=>({stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink,style:T||{animation:`${y} 1.4s ease-in-out infinite`}}]}))),G=R.forwardRef(function(r,s){const a=j({props:r,name:"MuiCircularProgress"}),{className:l,color:c="primary",disableShrink:D=!1,size:d=40,style:$,thickness:i=3.6,value:p=0,variant:b="indeterminate",...w}=a,o={...a,color:c,disableShrink:D,size:d,thickness:i,value:p,variant:b},f=V(o),u={},v={},k={};if(b==="determinate"){const x=2*Math.PI*((t-i)/2);u.strokeDasharray=x.toFixed(3),k["aria-valuenow"]=Math.round(p),u.strokeDashoffset=`${((100-p)/100*x).toFixed(3)}px`,v.transform="rotate(-90deg)"}return m.jsx(z,{className:U(f.root,l),style:{width:d,height:d,...v,...$},ownerState:o,ref:s,role:"progressbar",...k,...w,children:m.jsx(A,{className:f.svg,ownerState:o,viewBox:`${t/2} ${t/2} ${t} ${t}`,children:m.jsx(K,{className:f.circle,style:u,ownerState:o,cx:t,cy:t,r:(t-i)/2,fill:"none",strokeWidth:i})})})});export{G as C};
//# sourceMappingURL=CircularProgress-C0z7Gm7B.js.map
