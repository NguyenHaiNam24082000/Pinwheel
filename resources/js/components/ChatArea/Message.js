import React from "react";
import LinkPreview from "@ashwamegh/react-link-preview";
import Media from "../Media";
import ContextMenuChat from "../ContextMenu/ContextMenuChat";

export default function Message({
    index,
    userId,
    messageId,
    effect,
    content,
    CustomComponent,
    normalizeContent,
    avatar,
    name,
}) {
    const [active, setActive] = React.useState(false),
        [position, setPosition] = React.useState({ x: 0, y: 0 });

    const [menuRadius, setMenuRadius] = React.useState(100),
        [itemRadius, setItemRadius] = React.useState(25);

    const [contextMenuItems, setContextMenuItems] = React.useState([]);
    // React.useEffect(() => {
    //     // Only for CodePen preview
    //     setTimeout(() => {
    //         const centerX = window.innerWidth / 2 - menuRadius / 4,
    //             centerY = window.innerHeight / 3 - menuRadius / 4;

    //         setPosition({ x: centerX, y: centerY });

    //         setActive(true);
    //     }, 500);
    // }, []);
    React.useEffect(() => {
        const handleClick = (e) => {
            const items=
                document.getElementsByClassName("context-menu-item");

            if (items && items.length > 0) {
                let count = 0;

                for (let i = 0; i < items.length; i++) {
                    if (items[i].contains(e.target)) {
                        count++;
                    }
                }

                if (count === 0) {
                    setActive(false);
                }
            } else {
                setActive(false);
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    React.useEffect(() => {
        setContextMenuItems([
            { name: "Copy", icon: "far fa-copy" },
            { name: "Reply", icon: "fa fa-reply" },
            { name: "Like", icon: "far fa-thumbs-up" },
            { name: "Delete", icon: "fas fa-trash" },
            { name: "Delete", icon: "fas fa-trash" },
            { name: "Delete", icon: "fas fa-trash" },
        ]);
        return () => {};
    }, []);

    React.useEffect(() => {
        const handleClick = (e) => {
          const items = document.getElementsByClassName("context-menu-item");
          
          if(items && items.length > 0){
            let count = 0;
            
            for(let i = 0; i < items.length; i++){
              if(items[i].contains(e.target)){
                count++;
              }
            }
            
            if(count === 0){
              setActive(false);
            }
          }
          else{
            setActive(false);
          }
        }
        
        document.addEventListener("click", handleClick);
        
        return () => {
          document.removeEventListener("click", handleClick);
        }
      }, []);
      
      const handleOnContextMenu = (e) => {
        e.preventDefault();
        setActive(true);
        // Added some barriers for the menu position so it doesnt extend off the screen
        const x = Math.min(Math.max(menuRadius + 10, e.clientX - itemRadius), window.innerWidth - (menuRadius * 1.5) - 10),
              y = Math.min(Math.max(menuRadius + 10, e.clientY - itemRadius), window.innerHeight - (menuRadius * 1.5) - 10);
        setPosition({ x, y });
      }

    const getContextMenuItems = () => {
        const getOffset = (index) => {
          const step = (2 * Math.PI) / contextMenuItems.length,
                angle = index * step;
          
          const x = Math.round(menuRadius + (menuRadius * Math.cos(angle)) - itemRadius - (menuRadius - itemRadius)),
                y = Math.round(menuRadius + (menuRadius * Math.sin(angle)) - itemRadius - (menuRadius - itemRadius));
          
          return { x, y };
        }
        
        return contextMenuItems.map((item, index) => {
          return(
            <ContextMenuChat
              key={item.name}
              index={index}
              name={item.name}
              icon={item.icon}
              active={active}
              position={position}
              offset={getOffset(index)}
            />
          )
        })
      }

    return (
        <div
            key={index}
            className={`flex rounded-box relative ${
                messageId === userId ? "bg-base-100" : "bg-base-300"
            } p-3 mt-2 mb-2 ml-4`}
            style={{ width: "calc(100% - 32px)" }}
            onContextMenu={handleOnContextMenu}

        >
            {getContextMenuItems()}
            <div className="avatar mr-3">
                <div className="w-12 h-12 mask mask-squircle">
                    <img src={avatar} />
                </div>
            </div>
            <div
                className="flex flex-col break-words"
                style={{ width: "calc(100% - 72px)" }}
            >
                <div className="flex justify-between w-full">
                    <div className="font-bold w-full">{name}</div>
                    <div>24:00</div>
                </div>
                <div className={effect}>
                    {normalizeContent(content)}
                    {content.match(/(https?:\/\/\S+)/g) &&
                        content
                            .match(/(https?:\/\/\S+)/g)
                            .map((value, index) => (
                                <LinkPreview
                                    url={value}
                                    key={index}
                                    render={CustomComponent}
                                />
                            ))}
                    {/* <Media url={"../../assets/sounds/music/cat-walk.mp3"}/> */}
                </div>
            </div>
        </div>
    );
}
