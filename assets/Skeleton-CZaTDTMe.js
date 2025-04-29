import{q as b,p as v,r as w,s as C,j as k,t as x,v as R,x as S,y as $,z as M,aL as h,aM as c}from"./index-bD9A951G.js";try{let t=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},e=new t.Error().stack;e&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[e]="06cca090-8fd6-4e26-9d40-efab1169b935",t._sentryDebugIdIdentifier="sentry-dbid-06cca090-8fd6-4e26-9d40-efab1169b935")}catch{}function U(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function I(t){return parseFloat(t)}function A(t){return b("MuiSkeleton",t)}v("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const D=t=>{const{classes:e,variant:a,animation:n,hasChildren:s,width:o,height:i}=t;return S({root:["root",a,n,s&&"withChildren",s&&!o&&"fitContent",s&&!i&&"heightAuto"]},A,e)},r=c`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,l=c`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`,T=typeof r!="string"?h`
        animation: ${r} 2s ease-in-out 0.5s infinite;
      `:null,X=typeof l!="string"?h`
        animation: ${l} 2s linear 0.5s infinite;
      `:null,_=x("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})($(({theme:t})=>{const e=U(t.shape.borderRadius)||"px",a=I(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:M(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${e}/${Math.round(a/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:n})=>n.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:n})=>n.hasChildren&&!n.width,style:{maxWidth:"fit-content"}},{props:({ownerState:n})=>n.hasChildren&&!n.height,style:{height:"auto"}},{props:{animation:"pulse"},style:T||{animation:`${r} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:{"&::after":X||{animation:`${l} 2s linear 0.5s infinite`}}}]}})),E=w.forwardRef(function(e,a){const n=C({props:e,name:"MuiSkeleton"}),{animation:s="pulse",className:o,component:i="span",height:d,style:f,variant:g="text",width:m,...p}=n,u={...n,animation:s,component:i,variant:g,hasChildren:!!p.children},y=D(u);return k.jsx(_,{as:i,ref:a,className:R(y.root,o),ownerState:u,...p,style:{width:m,height:d,...f}})});export{E as S};
//# sourceMappingURL=Skeleton-CZaTDTMe.js.map
