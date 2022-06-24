import HoldOn from 'react-hold-on'


//Hold on for preloading .


var options = {
    theme: "sk-dot",
    message: 'Please Wait...',
    backgroundColor: "#1847B1",
    textColor: "white"
};
// HoldOn.open({
//   theme: "sk-cube-grid"
// })



//show Loader
export const showLoader = () => {
    HoldOn.open(options);
};


//Hide Loader
export const hideLoader = () => {
    HoldOn.close()
};