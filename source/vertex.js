const vertexShaderSrc = `      
    attribute vec3 aPosition;  
    uniform mat4 perspectiveMatrix;
    uniform mat4 cameraMatrix;
		uniform mat4 uModelTransformMatrix;
    attribute vec3 color;
    uniform int clrpick;
    varying vec3 vcolor;
    void main () {             
          gl_Position = perspectiveMatrix*cameraMatrix*uModelTransformMatrix * vec4(aPosition, 1.0);   
          if(clrpick==0){
            vcolor = color;
          }else{
            vcolor = vec3(0,0,0);
          }
    }                          
	  `;

export default vertexShaderSrc;
