    
    
export function convertSku(originalSku) {  
    const bellaCanvasRegex = /bella canvas (\d+) (\w+) (\w+)/i;  
    const G2400Regex = /gildan 2400 (\w+) (\w+)/i;  
    const G5000Regex = /gildan 5000 (\w+) (\w+)/i;  
    const G500BRegex = /gildan 5000b (\w+) (\w+)/i;  
    const G18500BRegex = /gildan 18500b (\w+) (\w+)/i;  
    const G500LRegex = /gildan 5000l (\w+) (\w+)/i;  
    const G500VLRegex = /gildan 5v00l (\w+) (\w+)/i; 
    // GIL.G570.S.WHITERED

    const RS4424Regex = /rabbitskins 4424 (\w+) (\w+)/i;  
    const RS3321Regex = /rabbitskins 3321 (\w+) (\w+)/i;  
    const RS3321Blue = /rabbitskins 3321blue (\w+)/i;  
    const RS3321Pink = /rabbitskins 3321pink (\w+)/i;  
    const RS3322Regex = /lat 3322 (\w+) (\w+)/i;  
    const L2616Regex = /lat 2616 (\w+) (\w+)/i;  
    const L3804Regex = /lat 3804 (\w+) (\w+)/i; 

    const H5280Regex = /hanes 5280 (\w+) (\w+)/i;  
    const AA2001WRegex = /americanapparel 2001w (\w+) (\w+)/i;  
    const BC3001Regex = /bella_canvas 3001 (\w+) (\w+)/i;  
    const BC3739Regex = /bella_canvas 3739 (\w+) (\w+)/i;  
    const BC6004Regex = /bella_canvas 6004 (\w+) (\w+)/i;  
    const BC6005Regex = /bella_canvas 6005 (\w+) (\w+)/i;  
    const BC8800Regex = /bella_canvas 8800 (\w+) (\w+)/i; 

    const G5000Blue = /gildan 5000blue (\w+)/i;  
    const G500BBlue = /gildan 5000bblue (\w+)/i;  
    const G500LBlue = /gildan 5000lblue (\w+)/i;  
    const G500VLBlue = /gildan 5000vlblue (\w+)/i;  
    const G5000Pink = /gildan 5000pink (\w+)/i;  
    const G500BPink = /gildan 5000bpink (\w+)/i;  
    const G500LPink = /gildan 5000lpink (\w+)/i;  
    const G500VLPink = /gildan 5000vlpink (\w+)/i;  
    const G570Regex = /gildan 5700 (\w+)\/(\w+) (\w+)/i;  

// new skus
    const bellaCanvasRegex2 = /bella canvas (\d+) (\w+) (\w+)/i; 
    const G2400Regex2 = /GIL\.G2400\.(\w+)\.(\w+)/i;  
    const G5000Regex2 = /GIL\.G5000\.(\w+)\.(\w+)/i; 
    const G500BRegex2 = /GIL\.G500B\.(\w+)\.(\w+)/i; 
    const G18500BRegex2 = /GIL\.G185B\.(\w+)\.(\w+)/i; 
    const G500LRegex2 = /GIL\.G500L\.(\w+)\.(\w+)/i; 
    const G500VLRegex2 = /GIL\.G500VL\.(\w+)\.(\w+)/i; 

    const RS4424Regex2 = /LAT\.4424\.(\w+)\.(\w+)/i;  
    const RS3321Regex2 = /LAT\.3321\.(\w+)\.(\w+)/i;  
    const RS3321Blue2 = /LAT\.4424\.(\w+)\.(\w+)/i;  
    const RS3321Pink2 = /LAT\.4424\.(\w+)\.(\w+)/i;  
    const RS3322Regex2 = /LAT\.3322\.(\w+)\.(\w+)/i;  
    const L2616Regex2 = /LAT\.2616\.(\w+)\.(\w+)/i;  
    const L3804Regex2 = /LAT\.4424\.(\w+)\.(\w+)/i; 

    const H5280Regex2 = /hanes 5280 (\w+) (\w+)/i;  
    const AA2001WRegex2 = /americanapparel 2001w (\w+) (\w+)/i;  
    const BC3001Regex2 = /BEL\.3001\.(\w+)\.(\w+)/i; 
    const BC3739Regex2 = /BEL\.3739\.(\w+)\.(\w+)/i; 
    const BC6004Regex2 = /BEL\.6004\.(\w+)\.(\w+)/i;   
    const BC6005Regex2 = /BEL\.6005\.(\w+)\.(\w+)/i;  
    const BC8800Regex2 = /BEL\.8800\.(\w+)\.(\w+)/i; 

    const G5000Blue2 = /gildan 5000blue (\w+)/i;  
    const G500BBlue2 = /gildan 5000bblue (\w+)/i;  
    const G500LBlue2 = /gildan 5000lblue (\w+)/i;  
    const G500VLBlue2 = /gildan 5000vlblue (\w+)/i;  
    const G5000Pink2 = /gildan 5000pink (\w+)/i;  
    const G500BPink2 = /gildan 5000bpink (\w+)/i;  
    const G500LPink2= /gildan 5000lpink (\w+)/i;  
    const G500VLPink2 = /gildan 5000vlpink (\w+)/i;  
    const G570Regex2 = /gildan 5700 (\w+)\/(\w+) (\w+)/i;  
  
    const sizeMapping = {          
        'XXXXXL': '5XL',          
        'XXXXL': '4XL',           
        'XXXL': '3XL',          
        'XXL': '2XL',            
        'XL': 'XL',            
        'L': 'L',            
        'M': 'M',            
        'S': 'S'        
    };    
      
    let match;    
    let size, colorName, styleNumber;  
      
    if (originalSku.match(bellaCanvasRegex)) {            
        match = originalSku.match(bellaCanvasRegex);            
        styleNumber = match[1];            
        colorName = match[2].toUpperCase();            
        size = match[3].toUpperCase();            
        return `BLABEL${styleNumber}.${colorName}.${size}`; 
//G2400Regex
    } else if (originalSku.match(G2400Regex)) {  
        match = originalSku.match(G2400Regex);  
        const colorName = match[1].toUpperCase();  
        const size = match[2].toUpperCase();  
        return `BLABELG2400.${colorName}.${size}`;         
    } else if (originalSku.match(G2400Regex2)) {            
        match = originalSku.match(G2400Regex2);            
        size = match[1].toUpperCase();            
        colorName = match[2].toUpperCase();            
        const mappedSize = sizeMapping[size] || size;
        return `BLABELG2400.${colorName}.${mappedSize}`;         
//G5000Regex
    } else if (originalSku.match(G5000Regex)) {            
        match = originalSku.match(G5000Regex);            
        colorName = match[1].toUpperCase();            
        size = match[2].toUpperCase();            
        return `BLABELG5000.${colorName}.${size}`;  
    } else if (originalSku.match(G5000Regex2)) {            
        match = originalSku.match(G5000Regex2);            
        size = match[1].toUpperCase();            
        colorName = match[2].toUpperCase();            
        const mappedSize = sizeMapping[size] || size;
        return `BLABELG5000.${colorName}.${mappedSize}`;       
//G500BRegex       
    } else if (originalSku.match(G500BRegex)) {  
        match = originalSku.match(G500BRegex);  
        const colorName = match[1].toUpperCase();  
        const size = match[2].toUpperCase();  
        return `BLABELG500B.${colorName}.${size}`; 
    } else if (originalSku.match(G500BRegex2)) {            
        match = originalSku.match(G500BRegex2);            
        size = match[1].toUpperCase();            
        colorName = match[2].toUpperCase();            
        const mappedSize = sizeMapping[size] || size;
        return `BLABELG500B.${colorName}.${mappedSize}`; 
// G18500BRegex
    } else if (originalSku.match(G18500BRegex)) {  
        match = originalSku.match(G18500BRegex);  
        const colorName = match[1].toUpperCase();  
        const size = match[2].toUpperCase();  
        return `BLABELG185B.${colorName}.${size}`; 
    } else if (originalSku.match(G18500BRegex2)) {  
        match = originalSku.match(G18500BRegex2);  
        size = match[1].toUpperCase();            
        colorName = match[2].toUpperCase();            
        const mappedSize = sizeMapping[size] || size;
        return `BLABELG185B.${colorName}.${mappedSize}`; 
// G500LRegex
    } else if (originalSku.match(G500LRegex)) {  
        match = originalSku.match(G500LRegex);  
        const colorName = match[1].toUpperCase();  
        const size = match[2].toUpperCase();  
        return `BLABELG500L.${colorName}.${size}`; 
    } else if (originalSku.match(G500LRegex2)) {  
        match = originalSku.match(G500LRegex2);  
        size = match[1].toUpperCase();            
        colorName = match[2].toUpperCase();
        const mappedSize = sizeMapping[size] || size;  
        return `BLABELG500L.${colorName}.${mappedSize}`; 
// G500VLRegex
    } else if (originalSku.match(G500VLRegex)) {  
        match = originalSku.match(G500VLRegex);  
        const colorName = match[1].toUpperCase();  
        const size = match[2].toUpperCase();  
        return `BLABELG500VL.${colorName}.${size}`; 
    } else if (originalSku.match(G500VLRegex2)) {  
        match = originalSku.match(G500VLRegex2);  
        size = match[1].toUpperCase();            
        colorName = match[2].toUpperCase(); 
        const mappedSize = sizeMapping[size] || size; 
        return `BLABELG500VL.${colorName}.${mappedSize}`; 
// RS4424Regex
    } else if (originalSku.match(RS4424Regex)) {  
        match = originalSku.match(RS4424Regex);  
        const colorName = match[1].toUpperCase();  
        const size = match[2].toUpperCase();  
        return `BLABEL4424.${colorName}.${size}O`; 
    } else if (originalSku.match(RS4424Regex2)) {  
        match = originalSku.match(RS4424Regex2);  
        size = match[1].toUpperCase();            
        colorName = match[2].toUpperCase(); 
        const mappedSize = sizeMapping[size] || size; 
        return `BLABEL4424.${colorName}.${mappedSize}`; 
// RS3321Regex
    } else if (originalSku.match(RS3321Regex)) {  
        match = originalSku.match(RS3321Regex);  
        const colorName = match[1].toUpperCase();  
        const size = match[2].toUpperCase();  
        return `BLABEL3321.${colorName}.${size}T`; 
    } else if (originalSku.match(RS3321Regex2)) {  
        match = originalSku.match(RS3321Regex2);  
        size = match[1].toUpperCase();            
        colorName = match[2].toUpperCase(); 
        const mappedSize = sizeMapping[size] || size; 
        return `BLABEL3321.${colorName}.${mappedSize}`;  

    } else if (originalSku.match(RS3321Blue)) {  
        match = originalSku.match(RS3321Blue);  
        const size = match[1].toUpperCase();  
        return `BLABEL3321.LIGHTBLUE.${size}T`;  

    } else if (originalSku.match(RS3321Pink)) {  
        match = originalSku.match(RS3321Pink);  
        const size = match[1].toUpperCase();  
        return `BLABEL3321.PINK.${size}T`; 
// RS3322Regex
    } else if (originalSku.match(RS3322Regex)) {  
        match = originalSku.match(RS3322Regex);  
        const colorName = match[1].toUpperCase();  
        const size = match[2].toUpperCase();  
        return `BLABEL3322.${colorName}.${size}O`; 
    } else if (originalSku.match(RS3322Regex2)) {  
        match = originalSku.match(RS3322Regex2);  
        size = match[1].toUpperCase();            
        colorName = match[2].toUpperCase(); 
        const mappedSize = sizeMapping[size] || size; 
        return `BLABEL3322.${colorName}.${mappedSize}`; 
// L2616Regex
    } else if (originalSku.match(L2616Regex)) {  
        match = originalSku.match(L2616Regex);  
        const colorName = match[1].toUpperCase();  
        const size = match[2].toUpperCase();  
        return `BLABEL2616.${colorName}.${size}`; 
    } else if (originalSku.match(L2616Regex2)) {  
        match = originalSku.match(L2616Regex2);  
        size = match[1].toUpperCase();            
        colorName = match[2].toUpperCase(); 
        const mappedSize = sizeMapping[size] || size; 
        return `BLABEL2616.${colorName}.${mappedSize}`;   
// L3804Regex
    } else if (originalSku.match(L3804Regex)) {  
        match = originalSku.match(L3804Regex);  
        const colorName = match[1].toUpperCase();  
        const size = match[2].toUpperCase();  
        return `BLABEL3804.${colorName}.${size}`; 
    } else if (originalSku.match(L3804Regex2)) {  
        match = originalSku.match(L3804Regex2);  
        size = match[1].toUpperCase();            
        colorName = match[2].toUpperCase(); 
        const mappedSize = sizeMapping[size] || size; 
        return `BLABEL3804.${colorName}.${mappedSize}`; 
// BLABEL5280
    } else if (originalSku.match(BLABEL5280)) {  
        match = originalSku.match(H5280Regex);  
        const colorName = match[1].toUpperCase();  
        const size = match[2].toUpperCase();  
        return `BLABEL5280.${colorName}.${size}`;  
    } else if (originalSku.match(H5280Regex2)) {  
        match = originalSku.match(H5280Regex2);  
        size = match[1].toUpperCase();            
        colorName = match[2].toUpperCase(); 
        const mappedSize = sizeMapping[size] || size; 
        return `BLABEL5280.${colorName}.${mappedSize}`;  
// BC3001Regex
    } else if (originalSku.match(AA2001WRegex)) {  
        match = originalSku.match(AA2001WRegex);  
        const colorName = match[1].toUpperCase();  
        const size = match[2].toUpperCase();  
        return `BLABEL3001.${colorName}.${size}`; 
    } else if (originalSku.match(BC3001Regex)) {  
        match = originalSku.match(BC3001Regex);  
        const colorName = match[1].toUpperCase();  
        const size = match[2].toUpperCase();  
        return `BLABEL3001.${colorName}.${size}`; 
    } else if (originalSku.match(BC3001Regex2)) {  
        match = originalSku.match(BC3001Regex2);  
        size = match[1].toUpperCase();            
        colorName = match[2].toUpperCase(); 
        const mappedSize = sizeMapping[size] || size; 
        return `BLABEL3001.${colorName}.${mappedSize}`;  
// BC3739Regex
    } else if (originalSku.match(BC3739Regex)) {  
        match = originalSku.match(BC3739Regex);  
        const colorName = match[1].toUpperCase();  
        const size = match[2].toUpperCase();  
        return `BLABEL3739.${colorName}.${size}`; 
    } else if (originalSku.match(BC3739Regex2)) {  
        match = originalSku.match(BC3739Regex2);  
        size = match[1].toUpperCase();            
        colorName = match[2].toUpperCase(); 
        const mappedSize = sizeMapping[size] || size; 
        return `BLABEL3739.${colorName}.${mappedSize}`; 
// BC6004Regex
    } else if (originalSku.match(BC6004Regex)) {  
        match = originalSku.match(BC6004Regex);  
        const colorName = match[1].toUpperCase();  
        const size = match[2].toUpperCase();  
        return `BLABEL6004.${colorName}.${size}`;  
    } else if (originalSku.match(BC6004Regex2)) {  
        match = originalSku.match(BC6004Regex2);  
        size = match[1].toUpperCase();            
        colorName = match[2].toUpperCase(); 
        const mappedSize = sizeMapping[size] || size; 
        return `BLABEL6004.${colorName}.${mappedSize}`;  
// BC6005Regex
    } else if (originalSku.match(BC6005Regex)) {  
        match = originalSku.match(BC6005Regex);  
        const colorName = match[1].toUpperCase();  
        const size = match[2].toUpperCase();  
        return `BLABEL6005.${colorName}.${size}`;  
    } else if (originalSku.match(BC6005Regex2)) {  
        match = originalSku.match(BC6005Regex2);  
        size = match[1].toUpperCase();            
        colorName = match[2].toUpperCase(); 
        const mappedSize = sizeMapping[size] || size; 
        return `BLABEL6005.${colorName}.${mappedSize}`;  
// BC8800Regex
    } else if (originalSku.match(BC8800Regex)) {  
        match = originalSku.match(BC8800Regex);  
        const colorName = match[1].toUpperCase();  
        const size = match[2].toUpperCase();  
        return `BLABEL8800.${colorName}.${size}`;
    } else if (originalSku.match(BC8800Regex2)) {  
        match = originalSku.match(BC8800Regex2);  
        size = match[1].toUpperCase();            
        colorName = match[2].toUpperCase(); 
        const mappedSize = sizeMapping[size] || size; 
        return `BLABEL8800.${colorName}.${mappedSize}`; 

    } else if (originalSku.match(G5000Blue)) {  
        match = originalSku.match(G5000Blue);  
        const size = match[1].toUpperCase();  
        return `BLABELG5000.LIGHTBLUE.${size}`;  

    } else if (originalSku.match(G500BBlue)) {  
        match = originalSku.match(G500BBlue);  
        const size = match[1].toUpperCase();  
        return `BLABELG500B.LIGHTBLUE.${size}`;  

    } else if (originalSku.match(G500LBlue)) {  
        match = originalSku.match(G500LBlue);  
        const size = match[1].toUpperCase();  
        return `BLABELG500L.LIGHTBLUE.${size}`;  

    } else if (originalSku.match(G500VLBlue)) {  
        match = originalSku.match(G500VLBlue);  
        const size = match[1].toUpperCase();  
        return `BLABELG500VL.LIGHTBLUE.${size}`;  

    } else if (originalSku.match(G5000Pink)) {  
        match = originalSku.match(G5000Pink);  
        const size = match[1].toUpperCase();  
        return `BLABELG5000.LIGHTPINK.${size}`;  

    } else if (originalSku.match(G500BPink)) {  
        match = originalSku.match(G500BPink);  
        const size = match[1].toUpperCase();  
        return `BLABELG500B.LIGHTPINK.${size}`;  

    } else if (originalSku.match(G500LPink)) {  
        match = originalSku.match(G500LPink);  
        const size = match[1].toUpperCase();  
        return `BLABELG500L.LIGHTPINK.${size}`;  

    } else if (originalSku.match(G500VLPink)) {  
        match = originalSku.match(G500VLPink);  
        const size = match[1].toUpperCase();  
        return `BLABELG500VL.LIGHTPINK.${size}`;  

    } else if (originalSku.match(G570Regex)) {  
        match = originalSku.match(G570Regex);  
        const colorName1 = match[1].toUpperCase();  
        const colorName2 = match[2].toUpperCase();  
        const size = match[3].toUpperCase();  
        return `BLABELG570.${size}.${colorName1}${colorName2}`;  
    }  
      
    return originalSku;  
}  
