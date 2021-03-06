import React,{useState} from 'react'
import './Welcomedoc.css'
import './CTtest.css'
import axios from 'axios'
import './CTtest.css'
import SimpleMap from './SimpleMap'

function CTtest() {

    const [imagepath, setimagepath]=useState(null);
    const [imagepicked, setimagepicked]=useState(false);
    const [probability, setprobability]=useState(null);
    const [loading,setloading]=useState(false);
    const [response, setresponse]=useState(false);


   

    function handleChange(e){
        setimagepath(e.target.files[0]);
        setimagepicked(true);
    }

    loading? document.querySelector(".rightsvg").classList.add('loadingmovement') : console.log('hi')
    // response? document.querySelector('.result').classList.add('loadingmovement2') : console.log('hi')
    response? document.querySelector(".output").classList.add('loadingfinish') : console.log("hi")

    response ? parseFloat(probability)*100 > 50 ? document.querySelector(".App").style.background="#fff0f5" : document.querySelector(".App").style.background="#f0fff0" : console.log("no response yet");

    function handleSubmit(){
        const fd= new FormData();
        fd.append('title',imagepath.name)
        fd.append('image', imagepath, imagepath.name);
        for (var p of fd){
            console.log(p[1]);
        }
        setloading(true)
        axios.post('http://127.0.0.1:8000/addimage',fd)
        .then(res=> {
            setresponse(true);
            console.log(res);
            setprobability(res.data.prediction);})
        .catch(error=>console.log(error));
        
    }

    return (
        <div className="ctheader">

            <div className="upload-box">
                <div className="uploadcorner">
                    <h1>Please upload your CT scan</h1>
                    <h3 className="supportedfile">Supported file format (.nii.gz)</h3>
                    <div><input type="file" onChange={handleChange}/></div>
                    <div>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                
                <div className="right50">

                <div className="output">
                    <div >
                        Our model is {parseFloat(probability)*100} % confident that your scan is abnormal.
                        {parseFloat(probability)*100 < 30 ? 
                        <>Rest Assured, you are safe.</> : parseFloat(probability)*100 < 70 ? <> Still we would advice you to go and visit to a doctor. Here are a few doctors near you.</> : <>We highly recommend you to visit a doctor as soon as possible. Here are a few doctors near you.</>}
                        
                    </div>
                    <div className="map">
                            <SimpleMap/>
                    </div>
                </div>    
                
               
                <div className="rightsvg">
                <svg width="400" height="200" viewBox="0 0 940 821" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="undraw_medical_research_qg4d 1" clip-path="url(#clip0_1:2)">
                <path id="Vector" d="M473.464 380.739H274.344V555.481H473.464V380.739Z" fill="#CCCCCC"/>
                <path id="Vector_2" d="M172.975 818.305H71.6052L60.7441 750.113H183.836L172.975 818.305Z" fill="#E6E6E6"/>
                <path id="Vector_3" d="M490.45 191.356L298.801 189.964C299.282 168.056 305.777 146.543 319.974 127.292C329.297 114.649 329.096 100.89 326.849 89.2976C323.382 71.4085 331.445 53.1054 349.362 41.7177C363.055 33 380.337 28.5125 397.952 29.1003L401.674 29.222C413.795 29.6173 425.596 32.3963 435.993 37.3038C446.389 42.2113 455.049 49.09 461.175 57.3083C467.402 66.0817 469.913 76.1819 468.346 86.149C467.131 95.5272 470.038 105.001 476.837 114.565C488.567 135.566 491.107 162.44 490.45 191.356Z" fill="#2F2E41"/>
                <g id="legs">
                <path id="Vector_4" d="M618.673 770.253L581.06 777.953L397.9 464.787L409.347 770.253H371.734C331.542 626.539 258.977 460.679 291.601 408.315L486.209 399.331L618.673 770.253Z" fill="#6C63FF"/>
                <path id="Vector_5" d="M376.53 768.911L373.109 805.614C372.954 807.276 373.254 808.944 373.988 810.507C374.721 812.07 375.873 813.492 377.364 814.677C378.856 815.862 380.653 816.783 382.635 817.379C384.617 817.974 386.739 818.23 388.857 818.129L412.878 816.987C413.991 816.934 415.076 816.69 416.055 816.27C417.033 815.851 417.883 815.268 418.542 814.562C419.201 813.857 419.654 813.046 419.869 812.187C420.084 811.328 420.055 810.443 419.785 809.594L406.451 767.737L376.53 768.911Z" fill="#E6E6E6"/>
                <path id="Vector_6" d="M577.451 790.615C605.722 795.805 625.917 803.183 639.184 813.167C643.909 816.696 650.09 818.776 656.604 819.028C664.925 819.371 671.728 818.639 676.841 816.847H676.842C678.152 816.394 679.283 815.674 680.118 814.762C680.954 813.85 681.463 812.779 681.593 811.661C681.748 810.524 681.513 809.376 680.912 808.335C680.311 807.294 679.366 806.398 678.175 805.741L611.127 768.3L582.647 777.241L576.003 782.455C575.284 783.02 574.741 783.708 574.418 784.465C574.095 785.222 573.999 786.027 574.14 786.818C574.28 787.609 574.652 788.363 575.227 789.022C575.802 789.681 576.563 790.226 577.451 790.615H577.451Z" fill="#E6E6E6"/>
                </g>
                <path id="Vector_7" d="M396.264 138.787C424.263 138.787 446.96 120.973 446.96 98.9993C446.96 77.0253 424.263 59.2119 396.264 59.2119C368.266 59.2119 345.568 77.0253 345.568 98.9993C345.568 120.973 368.266 138.787 396.264 138.787Z" fill="#FFB9B9"/>
                <path id="Vector_8" d="M440.419 172.157L357.016 168.307C365.189 153.583 368.454 139.405 365.192 125.952H427.336C427.195 136.281 433.745 154.149 440.419 172.157Z" fill="#FFB9B9"/>
                <path id="Vector_9" d="M492.75 410.881L309.591 421.15L328.397 166.382L360.287 159.322L396.264 165.739L432.241 151.621L455.137 158.039L492.75 410.881Z" fill="#6C63FF"/>
                <path id="Vector_10" d="M340.662 594.418L215.557 571.957C252.757 475.141 319.775 253.654 298.143 174.724L363.557 151.621L340.662 594.418Z" fill="#E6E6E6"/>
                <path id="Vector_11" d="M280.154 314.622L232.728 291.519L273.174 198.552C277.685 188.959 286.325 180.904 297.601 175.781L311.226 169.59L303.049 263.283L280.154 314.622Z" fill="#E6E6E6"/>
                <path id="Vector_12" d="M601.502 573.24C562.016 591.169 463.315 601.164 419.977 588.642C416.788 501.168 410.534 253.735 430.607 149.055L502.563 172.157L496.021 241.464C461.621 300.753 561.513 507.255 601.502 573.24Z" fill="#E6E6E6"/>
                <g id="upperhand">
                <path id="Vector_13" d="M595.778 303.071L551.623 291.52L492.75 238.897L502.563 172.157L600.684 279.968L595.778 303.071Z" fill="#E6E6E6"/>
                </g>
                <path id="Vector_14" d="M440.419 88.7315C412.26 79.6442 384.45 78.9867 357.016 87.4481L345.568 55.3614H450.231L440.419 88.7315Z" fill="#2F2E41"/>
                <g id="hands">
                <path id="Vector_15" d="M491.115 331.307L512.375 362.11C548.133 354.283 579.124 329.607 608.861 300.504L600.684 279.968L549.988 290.236L491.115 331.307Z" fill="#E6E6E6"/>
                <path id="Vector_16" d="M457.398 353.027C458.12 355.516 460.071 357.677 462.821 359.039C465.571 360.4 468.897 360.85 472.07 360.29L509.551 353.628L504.134 334.852L466.652 341.512C463.479 342.077 460.722 343.607 458.987 345.766C457.251 347.925 456.68 350.537 457.398 353.027V353.027Z" fill="#FFB9B9"/>
                </g>
                <path id="Vector_17" d="M475.579 267.775H469.038C469.038 195.164 449.988 144.562 431.425 144.562L429.789 139.429C446.437 139.429 457.051 160.488 463.023 178.156C471.12 202.108 475.579 233.935 475.579 267.775Z" fill="#3F3D56"/>
                <path id="Vector_18" d="M325.126 249.807H318.585C318.585 183.306 337.766 141.995 366.01 141.995L364.375 147.129C344.838 147.129 325.126 178.878 325.126 249.807Z" fill="#3F3D56"/>
                <path id="Vector_19" d="M472.309 281.893C481.34 281.893 488.662 276.147 488.662 269.059C488.662 261.97 481.34 256.224 472.309 256.224C463.277 256.224 455.955 261.97 455.955 269.059C455.955 276.147 463.277 281.893 472.309 281.893Z" fill="#3F3D56"/>
                <path id="Vector_20" d="M298.96 280.61H292.419C292.419 262.21 305.624 247.24 321.855 247.24V252.374C309.231 252.374 298.96 265.04 298.96 280.61Z" fill="#3F3D56"/>
                <path id="Vector_21" d="M351.292 280.61H344.75C344.75 265.04 334.48 252.374 321.855 252.374V247.24C338.087 247.24 351.292 262.21 351.292 280.61Z" fill="#3F3D56"/>
                <path id="Vector_22" d="M348.021 287.027C351.634 287.027 354.563 284.729 354.563 281.893C354.563 279.058 351.634 276.759 348.021 276.759C344.408 276.759 341.48 279.058 341.48 281.893C341.48 284.729 344.408 287.027 348.021 287.027Z" fill="#3F3D56"/>
                <path id="Vector_23" d="M295.69 287.027C299.302 287.027 302.231 284.729 302.231 281.893C302.231 279.058 299.302 276.759 295.69 276.759C292.077 276.759 289.148 279.058 289.148 281.893C289.148 284.729 292.077 287.027 295.69 287.027Z" fill="#3F3D56"/>
                <path id="Vector_24" d="M213.921 234.684L254.735 240.404L348.021 344.505L298.462 335.353L213.921 234.684Z" fill="#6C63FF"/>
                <path id="Vector_25" d="M206.682 233.41C206.06 233.417 205.452 233.556 204.922 233.81C204.391 234.065 203.958 234.427 203.667 234.859C203.376 235.29 203.238 235.775 203.267 236.263C203.297 236.75 203.492 237.223 203.834 237.631L291.033 341.464C291.519 342.045 292.271 342.457 293.133 342.615L333.704 350.107C334.388 350.233 335.105 350.193 335.759 349.993C336.414 349.792 336.975 349.44 337.369 348.983C337.762 348.526 337.969 347.986 337.963 347.434C337.957 346.883 337.737 346.346 337.332 345.895L241.593 239.058C241.334 238.767 241.004 238.519 240.622 238.328C240.24 238.137 239.814 238.007 239.368 237.946L207.336 233.456C207.121 233.426 206.902 233.41 206.682 233.41Z" fill="#3F3D56"/>
                <path id="Vector_26" d="M261.077 307.65L263.501 326.808L301.743 323.829C304.98 323.576 307.957 322.325 310.019 320.351C312.081 318.376 313.058 315.839 312.737 313.299C312.416 310.758 310.822 308.422 308.306 306.804C305.79 305.186 302.558 304.418 299.321 304.671L261.077 307.65Z" fill="#FFB9B9"/>
                <path id="Vector_27" d="M227.823 305.431C227.879 311.963 231.222 318.214 237.123 322.82C243.025 327.427 251.008 330.016 259.332 330.023H265.62L270.198 300.082L232.293 289.372L227.823 305.431Z" fill="#E6E6E6"/>
                <path id="Vector_28" d="M45.5738 724.886C71.676 752.32 125.859 755.208 125.859 755.208C125.859 755.208 137.722 713.615 111.62 686.181C85.5176 658.746 31.3347 655.859 31.3347 655.859C31.3347 655.859 19.4717 697.451 45.5738 724.886Z" fill="#E6E6E6"/>
                <path id="Vector_29" d="M178.543 735.199C161.319 753.302 125.566 755.208 125.566 755.208C125.566 755.208 117.738 727.762 134.962 709.659C152.186 691.556 187.939 689.65 187.939 689.65C187.939 689.65 195.767 717.096 178.543 735.199Z" fill="#E6E6E6"/>
                <path id="Vector_30" d="M940.49 817.817H0V821H940.49V817.817Z" fill="#3F3D56"/>
                </g>
                <defs>
                <clipPath id="clip0_1:2">
                <rect width="940" height="821" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                </div>


                </div>
            </div>

        </div>
    )
}

export default CTtest
