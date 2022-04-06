varying vec2 vUv;

float random(vec2 st){
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    // // Pattern 1 
    // gl_FragColor = vec4(vUv, 1.0, 1.0);

    // // Pattern 2
    // gl_FragColor = vec4(vUv, 0.0, 1.0);

    // // Pattern 3
    // float strength = vUv.x;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // // Pattern 4
    // float strength = vUv.y;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // // Pattern 5
    // float strength = 1.0 - vUv.y;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // // Pattern 6
    // float strength = vUv.y * 10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // // Pattern 7
    // float strength = mod(vUv.y * 10.0, 1.0);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // // Pattern 8
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.5, strength);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // // Pattern 9
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.8, strength);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // // Pattern 10
    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.8, strength);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // // Pattern 11
    // float strengthX = mod(vUv.x * 10.0, 1.0);
    // strengthX = step(0.8, strengthX);
    // float strengthY = mod(vUv.y * 10.0, 1.0);
    // strengthY = step(0.8, strengthY);
    // float strength = strengthX + strengthY;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // // Pattern 12
    // float strengthX = mod(vUv.x * 10.0, 1.0);
    // strengthX = step(0.8, strengthX);
    // float strengthY = mod(vUv.y * 10.0, 1.0);
    // strengthY = step(0.8, strengthY);
    // float strength = strengthX * strengthY;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // // // Pattern 13
    // float strengthX = mod(vUv.x * 10.0, 1.0);
    // strengthX = step(0.4, strengthX);
    // float strengthY = mod(vUv.y * 10.0, 1.0);
    // strengthY = step(0.8, strengthY);
    // float strength = strengthX * strengthY;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // // Pattern 14
    // float strengthX = step(0.4, mod(vUv.x * 10.0, 1.0) ) * step(0.8, mod(vUv.y * 10.0, 1.0) );
    // float strengthY = step(0.8, mod(vUv.x * 10.0, 1.0) ) * step(0.4, mod(vUv.y * 10.0, 1.0) );
    // float strength = strengthX + strengthY;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // // Pattern 15
    // float strengthX = step(0.4, mod(vUv.x * 10.0, 1.0) ) * step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0) );
    // float strengthY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0) ) * step(0.4, mod(vUv.y * 10.0, 1.0) );
    // float strength = strengthX + strengthY;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // // Pattern 16
    // float strength = abs(vUv.x - 0.5);

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // // Pattern 17
    // float strengthX = abs(vUv.x - 0.5);
    // float strengthY = abs(vUv.y - 0.5);

    // float strength = min(strengthX, strengthY);
    
    // // Pattern 18
    // float strengthX = abs(vUv.x - 0.5);
    // float strengthY = abs(vUv.y - 0.5);

    // float strength = max(strengthX, strengthY);

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // // Pattern 19
    // float strengthX = step( 0.2, abs(vUv.x - 0.5) );
    // float strengthY = step( 0.2, abs(vUv.y - 0.5) );

    // float strength = max(strengthX, strengthY);

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // // Pattern 20
    // float square1 = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // float square2 = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    // float strength = square1 * square2;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // // Pattern 21
    // float strength = floor(vUv.x * 10.0) / 10.0;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // // Pattern 22
    // float patternX = floor(vUv.x * 10.0) / 10.0;
    // float patternY = floor(vUv.y * 10.0) / 10.0;

    // float strength = patternX * patternY;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // Pattern 23
    // float strength = random(vUv);

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // Pattern 24
    float patternX = floor(vUv.x * 10.0) / 10.0;
    float patternY = floor(vUv.y * 10.0) / 10.0;
    vec2 gridUv = vec2(patternX, patternY);
    float strength = random(gridUv);

    gl_FragColor = vec4(strength, strength, strength, 1.0);


    // float strength = mod(vUv.y * 10.0, 1.0);

    // gl_FragColor = vec4(strength, strength, strength, 1.0);
}