export const nodeStyle=(label=null)=>{
    return(
        {
            "shape":'round-rectangle',
            // boundingBox:true,
            // content: 'data(label)',
            "text-wrap" : "wrap",
            "text-overflow-wrap":"whitespace",
            "text-max-width" : "80px",
            "background-color":"#cec6a8",
            "font-size":'10px',
            "compound-sizing-wrt-labels":"include",
            "text-halign":"center",
            "text-valign":"center",
            "width":label.length*2,
            "height":label.length*2,
            'curve-style': 'cola',
        }
    )
}

export const nodeMainStyle=(label=null)=>{
    return(
        {
            // label:label,
            // boundingBox:true,
            // content:"data(label)",
            "shape":'ellipse',
            "text-wrap" : "wrap",
            "text-overflow-wrap":"whitespace",
            "text-max-width" : "80px",
            "background-color":"#e0e0e0",
            "font-size":'10px',
            "compound-sizing-wrt-labels":"include",
            "text-halign":"center",
            "text-valign":"center",
            "width":label.length*2,
            "height":label.length*2,
            'curve-style': 'cola',

        }
    )
}


export const edgeStyle=(label=null)=>{
    return(
        {
            label:label,
            // content:"data(label)",
            "text-rotation":"autorotate",
            "font-size":'10px',
            "text-wrap":"wrap",
            "text-overflow-wrap":"whitespace",
            "text-max-width" : "80px",
            "background-color":"#90CAF9",
            "text-halign":"center",
            "text-valign":"top",
            "text-margin-x":"10px",
            "text-margin-y":"10px"
        }
    )
}

export const cytoscapeStylesheet = {

}
