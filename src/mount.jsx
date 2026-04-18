/* Mount each stage */
/* global React, ReactDOM, Landing, BuyerFlow, TravelerFlow, OrderFlow */

ReactDOM.createRoot(document.getElementById('landing-mount')).render(<Landing />);
ReactDOM.createRoot(document.getElementById('buyer-mount')).render(<BuyerFlow />);
ReactDOM.createRoot(document.getElementById('traveler-mount')).render(<TravelerFlow />);
ReactDOM.createRoot(document.getElementById('order-mount')).render(<OrderFlow />);
