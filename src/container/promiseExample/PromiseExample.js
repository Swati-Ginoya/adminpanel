import React ,{useEffect} from 'react';

function PromiseExample(props) {

    const One = () => {
        return "one";
    }

    const Two = () => {
       //with promise
       const p = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("two");
        }, 2000);
       })        
       return p
       
    }

    const Three = () => {
        return "three";
    }

    const All = async () => {
        const oneAns = One()
        console.log(oneAns);

        const twoAns = await Two()
        console.log(twoAns);

        const threeAns = Three()
        console.log(threeAns);
    }

    useEffect(() => {
        All()
    } , [])

    //callback function
    const print = (c) => {
        console.log(c);
    }

    const sum = (a,b,callbackFun) => {
        let sum = 0
        sum = a + b;
        callbackFun(sum)
    }
    sum (10 ,25 ,print)

    // promise .all

    const exa1 = "Abc";
    const exa2 = 456
    const exa3 = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("three");
        },2000);
    })
    Promise.all([exa1, exa2 ,exa3]).then((values) => {
        console.log(values);
    })
    return (
        <div>
            <h2>syncronice- Asyncronise ,promise</h2>
        </div>
    );
}

export default PromiseExample;