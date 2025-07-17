import{aS as I,aT as M,r as R,aU as j,j as m,s as h,d as U,aV as n,aW as E,aX as C,b0 as N,b3 as P,b4 as S}from"./index-7pUSThBQ.js";try{let e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},r=new e.Error().stack;r&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[r]="87b67cb2-e470-4579-9dbe-d5190c91cee4",e._sentryDebugIdIdentifier="sentry-dbid-87b67cb2-e470-4579-9dbe-d5190c91cee4")}catch{}function T(e){return I("MuiCircularProgress",e)}M("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const t=44,y=S`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,g=S`
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
`,_=typeof y!="string"?P`
        animation: ${y} 1.4s linear infinite;
      `:null,F=typeof g!="string"?P`
        animation: ${g} 1.4s ease-in-out infinite;
      `:null,V=e=>{const{classes:r,variant:s,color:a,disableShrink:l}=e,c={root:["root",s,`color${n(a)}`],svg:["svg"],circle:["circle",`circle${n(s)}`,l&&"circleDisableShrink"]};return E(c,T,r)},z=h("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.root,r[s.variant],r[`color${n(s.color)}`]]}})(C(({theme:e})=>({display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("transform")}},{props:{variant:"indeterminate"},style:_||{animation:`${y} 1.4s linear infinite`}},...Object.entries(e.palette).filter(N()).map(([r])=>({props:{color:r},style:{color:(e.vars||e).palette[r].main}}))]}))),A=h("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),K=h("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.circle,r[`circle${n(s.variant)}`],s.disableShrink&&r.circleDisableShrink]}})(C(({theme:e})=>({stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink,style:F||{animation:`${g} 1.4s ease-in-out infinite`}}]}))),B=R.forwardRef(function(r,s){const a=j({props:r,name:"MuiCircularProgress"}),{className:l,color:c="primary",disableShrink:D=!1,size:d=40,style:$,thickness:i=3.6,value:p=0,variant:b="indeterminate",...w}=a,o={...a,color:c,disableShrink:D,size:d,thickness:i,value:p,variant:b},u=V(o),f={},v={},k={};if(b==="determinate"){const x=2*Math.PI*((t-i)/2);f.strokeDasharray=x.toFixed(3),k["aria-valuenow"]=Math.round(p),f.strokeDashoffset=`${((100-p)/100*x).toFixed(3)}px`,v.transform="rotate(-90deg)"}return m.jsx(z,{className:U(u.root,l),style:{width:d,height:d,...v,...$},ownerState:o,ref:s,role:"progressbar",...k,...w,children:m.jsx(A,{className:u.svg,ownerState:o,viewBox:`${t/2} ${t/2} ${t} ${t}`,children:m.jsx(K,{className:u.circle,style:f,ownerState:o,cx:t,cy:t,r:(t-i)/2,fill:"none",strokeWidth:i})})})});export{B as C};
//# sourceMappingURL=CircularProgress-_EudjK-E.js.map
