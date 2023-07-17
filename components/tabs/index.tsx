import React from "react";

export function Tabs({ children, currentTab }: any) {
  const style = {
    notSelected: `border-b text-darkText hover:text-neutral-500`,
    selected: `text-primary border-b-2 border-primary `,
    default: `-mb-2 px-4 md:px-8 py-4 md:py-1 inline-block focus:outline-none text-darkText cursor-pointer`,
  };

  const childrenArray: any[] = React.Children.toArray(children);
  const [current, setCurrent] = React.useState(childrenArray[0].key);

  const newChildren = childrenArray.map((child) =>
    React.cloneElement(child, { selected: child?.key === current })
  );

  async function onTabclick(key: Number, title: string) { 
    await setCurrent(key);
    currentTab(title);
  }

  return (
    <nav className="">
      {childrenArray.map((child) => (
        <div
          role="link"
          tabIndex={0}
          onClick={() => onTabclick(child?.key, child?.props.title)}
          key={child?.key}
          className={`${style.default} 
              ${current === child?.key ? style.selected : style.notSelected}`}
        >
          {child?.props.title}
        </div>
      ))}
      <section>{newChildren}</section>
    </nav>
  );
}

export function Tab({ children, selected }: any) {
  return (
    <div hidden={!selected} className="mt-4">
      {children}
    </div>
  );
}
