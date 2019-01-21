function newElement(el_tag, el_class, el_id, el_text) {
    let el = document.createElement(el_tag);
    el.textContent = el_text;
    if(el_class) { //if class check if array or string
        if(Array.isArray(el_class)) el_class.forEach(className => {el.classList.add(className)});
        else el.classList.add(el_class);
    }
    if(el_id) el.setAttribute("id", el_id);
    if(el_text) el.textContent = el_text;
    return el;
}

function printLastLogin() {
    let terminal = document.getElementById("terminal");
    let line = document.createElement("div");
    //create line elements
    let timestamp = document.createElement("pre");
    //append everything to terminal
    line.appendChild(timestamp);
    terminal.appendChild(line);
    //set classes
    line.classList.add("line");
    timestamp.classList.add("color-prompt");

    let ip = getIP(function(ip) {
        let date = getTimestamp();
        timestamp.textContent = "Last login: " + date + " from " + ip;
    });
}
function getTimestamp() {
    const days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let date = new Date;
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let day = days[date.getDay()];
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;
    return day + " " + month + " " + date.getDate() + " " + hour + ":" + minute + ":" + second + " " + year;
}

//get the IP addresses associated with an account
function getIP(callback){
    var ip_dups = {};

    //compatibility for firefox and chrome
    var RTCPeerConnection = window.RTCPeerConnection
        || window.mozRTCPeerConnection
        || window.webkitRTCPeerConnection;
    var useWebKit = !!window.webkitRTCPeerConnection;

    //bypass naive webrtc blocking using an iframe
    if(!RTCPeerConnection){
        //NOTE: you need to have an iframe in the page right above the script tag
        //
        //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
        //<script>...getIPs called in here...
        //
        var win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection
            || win.mozRTCPeerConnection
            || win.webkitRTCPeerConnection;
        useWebKit = !!win.webkitRTCPeerConnection;
    }

    //minimal requirements for data connection
    var mediaConstraints = {
        optional: [{RtpDataChannels: true}]
    };

    var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};

    //construct a new RTCPeerConnection
    var pc = new RTCPeerConnection(servers, mediaConstraints);

    function handleCandidate(candidate){
        //match just the IP address
        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
        var ip_addr = ip_regex.exec(candidate)[1];

        //remove duplicates
        if(ip_dups[ip_addr] === undefined)
            callback(ip_addr);

        ip_dups[ip_addr] = true;
    }

    //listen for candidate events
    pc.onicecandidate = function(ice){

        //skip non-candidate events
        if(ice.candidate)
            handleCandidate(ice.candidate.candidate);
    };

    //create a bogus data channel
    pc.createDataChannel("");

    //create an offer sdp
    pc.createOffer(function(result){

        //trigger the stun server request
        pc.setLocalDescription(result, function(){}, function(){});

    }, function(){});

    //wait for a while to let everything done
    setTimeout(function(){
        //read candidate info from local description
        var lines = pc.localDescription.sdp.split('\n');

        lines.forEach(function(line){
            if(line.indexOf('a=candidate:') === 0)
                handleCandidate(line);
        });
    }, 1000);
}