import{g as R,a as I,r as M,b as j,j as m,s as h,c as E,K as n,d as N,m as C,L as U,aQ as P,aR as S}from"./index-Wd-8jL93.js";try{let e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},r=new e.Error().stack;r&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[r]="48d4a2ce-9cb5-4481-82d7-f82a357d896e",e._sentryDebugIdIdentifier="sentry-dbid-48d4a2ce-9cb5-4481-82d7-f82a357d896e")}catch{}function _(e){return R("MuiCircularProgress",e)}I("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const t=44,g=S`
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
      `:null,K=typeof y!="string"?P`
        animation: ${y} 1.4s ease-in-out infinite;
      `:null,T=e=>{const{classes:r,variant:s,color:a,disableShrink:l}=e,c={root:["root",s,`color${n(a)}`],svg:["svg"],circle:["circle",`circle${n(s)}`,l&&"circleDisableShrink"]};return N(c,_,r)},z=h("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.root,r[s.variant],r[`color${n(s.color)}`]]}})(C(({theme:e})=>({display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("transform")}},{props:{variant:"indeterminate"},style:F||{animation:`${g} 1.4s linear infinite`}},...Object.entries(e.palette).filter(U()).map(([r])=>({props:{color:r},style:{color:(e.vars||e).palette[r].main}}))]}))),A=h("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),V=h("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.circle,r[`circle${n(s.variant)}`],s.disableShrink&&r.circleDisableShrink]}})(C(({theme:e})=>({stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink,style:K||{animation:`${y} 1.4s ease-in-out infinite`}}]}))),G=M.forwardRef(function(r,s){const a=j({props:r,name:"MuiCircularProgress"}),{className:l,color:c="primary",disableShrink:D=!1,size:d=40,style:$,thickness:i=3.6,value:p=0,variant:v="indeterminate",...w}=a,o={...a,color:c,disableShrink:D,size:d,thickness:i,value:p,variant:v},f=T(o),u={},k={},b={};if(v==="determinate"){const x=2*Math.PI*((t-i)/2);u.strokeDasharray=x.toFixed(3),b["aria-valuenow"]=Math.round(p),u.strokeDashoffset=`${((100-p)/100*x).toFixed(3)}px`,k.transform="rotate(-90deg)"}return m.jsx(z,{className:E(f.root,l),style:{width:d,height:d,...k,...$},ownerState:o,ref:s,role:"progressbar",...b,...w,children:m.jsx(A,{className:f.svg,ownerState:o,viewBox:`${t/2} ${t/2} ${t} ${t}`,children:m.jsx(V,{className:f.circle,style:u,ownerState:o,cx:t,cy:t,r:(t-i)/2,fill:"none",strokeWidth:i})})})});export{G as C};
//# sourceMappingURL=CircularProgress-2j3MWkQb.js.map
