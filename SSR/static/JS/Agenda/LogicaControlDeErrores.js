let now = moment();
    document.querySelector("#inicio").min=now.format("Y-MM-DD");
    document.querySelector("#inicio").max=moment().add(1,"day").format("Y-MM-DD");
    document.querySelector("#fin").min=document.querySelector("#inicio").value;
    document.querySelector("#fin").max=now.add(10,"day").format("Y-MM-DD");
    document.querySelector("#timeInicio").addEventListener("change",()=>{
        document.querySelector("#timeFin").min=document.querySelector("#timeInicio").value;
        document.querySelector("#timeFin").disabled=false;
    });
    document.querySelector("#inicio").addEventListener("change",(e)=>{
        document.querySelector("#fin").disabled=false;
        document.querySelector("#fin").min=document.querySelector("#inicio").value;
        document.querySelector("#fin").max=moment(document.querySelector("#inicio").value).add(10,"day").format("Y-MM-DD");
    });