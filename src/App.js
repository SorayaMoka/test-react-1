import React, { useEffect, useState } from 'react';
import './App.css';
import { Evaluation } from "./cmps/Evaluation";
import Button from "@material-ui/core/es/Button";


const App = () => {

  const maxStars = 5;
  const [stars, setStars] = useState(0)

  useEffect(() => {
    const input = [
      { value: 'FR', label: "France" },
      { value: 'EN', label: "Angleterre" }
    ];

    const output = arrayToObject(input);
    console.log(output, 'output => {FR: "France", EN: "Angleterre"}');

    // exo 2
    const input4 = {
      a: [
        {
          b: "greg",
          c: {
            a: "greg"
          }
        }
      ],
      b: {
        c: "greg",
        a: "sabri",
        e: "arthur",
        d: [
          {
            a: "reever",
            b: {
              a: "sabri",
              b: "reever",
              c: "arthur"
            }
          }
        ]
      },
      c: {
        c: "greg",
        a: "sabri",
        e: "arthur",
        d: [
          {
            a: "reever"
          }
        ]
      }
    };
    const output4 = find(input4, "greg"); // ["greg", "greg", "greg", "greg"]
    console.log(output4);

    // exo 3
    const input3 = [
      { city: 'Paris', temp: 10 },
      { city: "Lyon", temp: 15 },
      { city: "Marseille", temp: 20 },
      { city: "Bordeaux", temp: 18 }];
    const output3 = temperatureAverage(input3);
    console.log(output3, "output3 => 15.75");


    // exo 4 Bonus
    const input2 = [1, 1, 5, 'a', '7', 'B', '3', '1', '2', 2, 10, true, false, '7', 7, 3, true, '2', 'a', 2, 2, 3];
    const output2 = sortValue(input2);
    console.log(output2, 'output2 => {0: [1,1], 1: [5], 2: ["a", "a"], 3: ["7", "7"], 4: ["B"], 5: ["3"], 6: ["2", "2"], 7: [2, 2, 2], ...}');
  }, []);


  function arrayToObject(input) { //  [{value: 'FR', label: "France"}]
    return input.reduce((acc, { value, label }) => ({ ...acc, [value]: label }), {});
  }

  function find(input, name) {

    let result = [];
    if (typeof input === "string") {
      if (input === name) {
        // We found a string matching the name, we push in the result array
        result.push(input);
      }

    } else if (input instanceof Array) {
      input.forEach(val => {
        result = result.concat(find(val, name));
      })
    } else if (!(input instanceof Array)) {
      for (const value of Object.values(input)) {
        result = result.concat(find(value, name));
      }
    }
    return result;
  }

  function temperatureAverage(input) {
    return input.reduce((acc, { temp }) => acc + temp, 0) / input.length;
  }

  function sortValue(input) {
    return input.reduce((acc, val) => {
      if (acc.length === 0) {
        acc[acc.length] = [val];
      } else {
        const index = acc.findIndex(value => (value.filter(v => v === val).length > 0))
        if (index === -1) {
          acc[acc.length] = [val];
        } else {
          acc[index].push(val);
        }
      }
      return acc;
    }, []);
  }

  function delStar() {
    if (maxStars >= 0 && stars > 0) {
      setStars(prevStars => prevStars - 1);
    }
  }

  function addStar() {
    if (stars < maxStars) {
      setStars(prevStars => prevStars + 1);
    }
  }

  return (
    <div className="App">
      <Button onClick={delStar}>-</Button>
      <Evaluation maxStars={maxStars} stars={stars}/>
      <Button onClick={addStar}>+</Button>
    </div>

  );

}

export default App;
