import React from 'react'

const RegularSkelton =
<>
    <div id="longest">.</div>
    <div id="longe">
      <div id="circle">.</div>
      <div id="long">.</div>
    </div>
    <div id="longe">
      <div id="loner">.</div>
      <div id="loner">.</div>
    </div>
</>

function SkeletonItems() : React.JSX.Element {

  const skeletonItem : React.JSX.Element = RegularSkelton;
  return skeletonItem;
}

export default SkeletonItems