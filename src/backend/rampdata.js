function getRampAlgorithms(onUpdate) {
  const count = 50;
setInterval(() => {
    const ramps = [];
    for (let i = 0; i < count; i++) {
      ramps.push({
        id: `ramp-${i}`,
        algorithm: [
          "Algorithm 1",
          "Algorithm 2",
          "Algorithm 3",
          "Algorithm 4",
          "Algorithm 5",
        ][Math.floor(Math.random() * 5)],
      });
    }
    //debugger;
    onUpdate(ramps);
   }, 500);
}

export default getRampAlgorithms;
 