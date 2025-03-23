import logo from "./imgs/logo-white.svg";
import burger from "./imgs/hamburger.svg";
import cancel from "./imgs/cancel.svg";

const content = {
    logo: {
        src: logo,
        alt: ""
    },
    burger: {
        src: burger,
        alt: ""
    },
    cancel: {
        src: cancel,
        alt: ""
    },
    links: [
        {
            text: "Link 1",
            target: "/link-1",
            dropdown: [
                {
                    text: "Sublink",
                    target: "/link-1?sublink=1"
                },
                {
                    text: "Sublink",
                    target: "/link-1?sublink=2"
                }
            ]
        },
        {
            text: "Link 2",
            target: "/link-2",
            dropdown: [
                {
                    text: "Sublink",
                    target: "/link-2?sublink=1"
                },
                {
                    text: "Sublink",
                    target: "/link-2?sublink=2"
                }
            ]
        },
        {
            text: "Link 3",
            target: "/link-3",
            dropdown: []
        },
        {
            text: "Link 4",
            target: "/link-4",
            dropdown: []
        }
    ]
}

export default content;