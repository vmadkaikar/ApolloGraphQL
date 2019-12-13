```
npm i
node start
```


Sample mutation query
```

mutation {
  addUser(user: { id: 1, fName: "Jhon", lName: "Snow", dob: "10/10/1945" }) {
    success
  }
}

```


sample fetch query
```

{
  allianceInfo(allId: "EHM35770") {
    allianceId
    alliancePhone
  }
  locations(zip: 44444) {
    ssacd
    stateAbbr
    countyName
  }
  users {
    id
    fName
    lName
    org {
      id
      name
    }
  }
}


```