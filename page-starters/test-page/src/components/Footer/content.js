import logo from "./imgs/logo-white.svg";
import locationPin from "./imgs/location-pin.png";
import phoneIcon from "./imgs/phone-icon.png";

const content = {
    logo: {
        src: logo,
        alt: ""
    },
    locationPin: {
        src: locationPin,
        alt: ""
    },
    phoneIcon: {
        src: phoneIcon,
        alt: ""
    },
    contacts: {
        heading: "Get In Touch",
        locations: [
            {
                street: "123 Location Rd",
                city: "City, ST 55555",
                link: ""
                // https://maps.google.com/?q=123+Location+Rd,+City,+ST+55555
            },
            {
                street: "1000 10th St N Unit B",
                city: "Town Name, ST, 12345",
                link: ""
                // https://maps.google.com/?q=1000+10th+St+N+Unit+B,+Town+Name,+ST+12345
            }
        ],
        phoneNumbers: [
            {
                number: "(123) 555-1234",
                link: "tel:+11235551234"
            }
        ]
    },
    navigation: {
        heading: "Quick Links",
        links: [
            {
                text: "Link 1",
                destination: "/link-1",
                id: "hero"
                // future heroes will have a "hero" id, so clicking this link will 
                //  send to the top of the page
            },
            {
                text: "Link 2",
                destination: "/link-2",
                id: "hero"
            },
            {
                text: "Link 3",
                destination: "/link-3",
                id: "hero"
            },
            {
                text: "Link 4",
                destination: "/link-4",
                id: "hero"
            }
        ]
    },
    hours: {
        heading: "Hours",
        times: [
            {
                days: "M-F",
                hours: "9:00am - 5:00pm"
            },
            {
                days: "Sat",
                hours: "9:00am - 4:00pm"
            },
            {
                days: "Sun",
                hours: "10:00am - 4:00pm"
            }
        ]
    }
}

export default content;