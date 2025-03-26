fetch("https://graph.instagram.com/me/media?fields=media_url&access_token=IGQWRNTU85Q2ExLWNCZAjc1ZAFVjMklvd3ZABY2Y5bjJOMFpZASDJ3RjE4R092ZAk8xSmxqNGdrRmV3cHNBQ2ZAxVXByWlZARVlM4NWhXUEpPaHAtYjNjWXRha1IxQ2RUZAU50X1JPQ3VPbGJKTG8tbEV3WHdiRHBVcGF4bFUZD").then( response=>{
    response.json().then( body=>{
        let photos=document.querySelector("#fotos");
        for(let url of body.data){
            let img=document.createElement("img");
            img.src=url.media_url;
            img.alt="Imagen";
            photos.appendChild(img);
        }
    } );
} );