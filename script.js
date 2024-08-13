import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadows
document.body.appendChild(renderer.domElement);

//////////////////////////////////////
//NOTE Percpective controll
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 12, 15 + 40.17440783358246);
camera.lookAt(0, 7, 0);
//////////////////////////////////////

//--------------------------------------------
//NOTE - direction light
const directionLight = new THREE.DirectionalLight(0xffffff, 3);
scene.add(directionLight);
directionLight.position.set(30, 20, 50);
directionLight.castShadow = true;
// Adjust shadow camera settings for larger coverage
const frustumSize = 100; // Increase the frustum size
directionLight.shadow.camera.left = -frustumSize;
directionLight.shadow.camera.right = frustumSize;
directionLight.shadow.camera.top = frustumSize;
directionLight.shadow.camera.bottom = -frustumSize;
//--------------------------------------------

//--------------------------------------------
//NOTE - ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);
//--------------------------------------------

//--------------------------------------------
//NOTE - creating ground
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x000080,
  side: THREE.DoubleSide,
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(groundMesh);
groundMesh.rotation.x = -0.5 * Math.PI;
groundMesh.receiveShadow = true;
groundMesh.position.y = -10;
groundMesh.visible = false;
//--------------------------------------------

//--------------------------------------------
//NOTE - show image
const showImage = (fname, px, py, width = 19.2, height = 10.8) => {
  const geometry = new THREE.PlaneGeometry(width, height); // Adjust the size as needed
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(fname); // Replace with the path to your Krishna texture
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);
  plane.position.set(px, py, 0);
  return plane;
};
showImage("flag.png", 0, 50, 36, 24);

showImage("map.png" , -10, 25, 7.01*0.75, 7.88*0.75)
showImage("map.png" , 10, 25, 7.01*0.75, 7.88*0.75)

//--------------------------------------------

// Create 3D text
const loader = new THREE.FontLoader();
const makeText = (text, x, y, size, color, z = 0, isl) => {
  loader.load(
    "https://ankitjha2603.github.io/solar-system3D/font.json",
    function (font) {
      const geometry = new THREE.TextGeometry(text, {
        font: font,
        size: size,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      const textMaterial = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.5,
        metalness: 0.5,
      });
      const textMesh = new THREE.Mesh(geometry, textMaterial);
      textMesh.castShadow = true;
      textMesh.receiveShadow = true; // Enable shadow receiving
      scene.add(textMesh);
      textMesh.position.y = y;
      textMesh.position.x = x;
      textMesh.position.z = z;
      return textMesh;
    }
  );
};

makeText("HAPPY INDEPENDENCE DAY", -26, 30, 3, 0xff9933);
makeText("Jai Hind!", -7, 24.25, 2.5, 0xffffff);
makeText("May our country continue to prosper and grow.", -28, 18, 2, 0x138808);

//////////////////////////////////////
//NOTE freedom fighters
const indianFreedomFighters = [
  "Ganga Singh Gurjar",
  "Sardar Vallabhbhai Patel",
  "Bhagat Singh",
  "Mahatma Gandhi",
  "Kamala Nehru",
  "Uyyalawada Narasimha Reddy",
  "Raja Ram Mohan Roy",
  "Motilal Nehru",
  "Lakshmi Sahgal",
  "Vijaya Lakshmi Pandit",
  "Surya Sen",
  "Tirupur Kumaran",
  "Annie Besant",
  "Sister Nivedita",
  "Alluri Sitarama Raju",
  "C. Rajagopalachari",
  "Raja Mahendra Pratap Singh",
  "Dadabhai Naoroji",
  "Chittaranjan Das",
  "Kasturba Gandhi",
  "Gopal Ganesh Agarkar",
  "Jatindra Nath Das",
  "Mangal Pandey",
  "Vinayak Damodar Savarkar",
  "Tantia Tope",
  "Sukhdev Thapar",
  "Har Dayal",
  "Khan Abdul Ghaffar Khan",
  "Rani Lakshmibai",
  "Rajguru (Shivaram Hari Rajguru)",
  "Kamala Nehru",
  "Basawon Singh (Sinha)",
  "Bipin Chandra Pal",
  "V. O. Chidambaram Pillai",
  "Matangini Hazra",
  "Rash Behari Bose",
  "Subhas Chandra Bose",
  "Gopal Krishna Gokhale",
  "Bhimrao Ambedkar",
  "Vijay Singh Pathik",
  "Potti Sreeramulu",
  "Kanaklata Barua",
  "Veerapandiya Kattabomman",
  "Raja Ram Mohan Roy",
  "Sardar Vallabhbhai Patel",
  "Subramania Bharati",
  "Mahatma Gandhi",
  "Aruna Asaf Ali",
  "Baba Ram Chandra",
  "Durga Bhabhi",
  "Madan Lal Dhingra",
  "Govind Ballabh Pant",
  "Birsa Munda",
  "Mahatma Gandhi",
  "K. Kamaraj",
  "Abdul Kalam Azad",
  "Tirupur Kumaran",
  "Mahatma Ayyankali",
  "Chakravarti Rajagopalachari",
  "Har Dayal",
  "Kanaiyalal Maneklal Munshi",
  "Matangini Hazra",
  "Madhusree Mukerjee",
  "Veerapandiya Kattabomman",
  "Rani Lakshmibai",
  "Raja Mahendra Pratap Singh",
];
//////////////////////////////////////
//NOTE - resize camera view
for (let i = 0; i < 22; i++) {
  makeText(
    indianFreedomFighters[i],
    -65,
    10 - 4.5 * i,
    2.5,
    0xffffff,
    0,
    "a.com"
  );
}
for (let i = 0; i < 22; i++) {
  makeText(indianFreedomFighters[i + 22], -10, 10 - 4.5 * i, 2.5, 0xffffff, 0);
}
for (let i = 0; i < 22; i++) {
  makeText(indianFreedomFighters[i + 44], 45, 10 - 4.5 * i, 2.5, 0xffffff, 0);
}

//////////////////////////////////////
//NOTE - Animate the text
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
//////////////////////////////////////

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
//////////////////////////////////////
