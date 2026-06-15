const fs = require('fs');

async function test() {
  const formData = new FormData();
  // Create a 1x1 pixel JPEG base64
  const base64 = "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAGBAQABAAAAAAAAAAAAAAAAAAAB/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAAPwA=";
  const buffer = Buffer.from(base64, 'base64');
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  
  formData.append('image', blob, 'test.jpg');

  try {
    const res = await fetch('http://localhost:3000/api/care/scan', {
      method: 'POST',
      body: formData
    });
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
  } catch (err) {
    console.error("Error:", err);
  }
}

test();
