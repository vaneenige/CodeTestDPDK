# CodeTestDPDK

## To run:
node ./app/server.js

DPDK code test

TODO:

1. Array with names
    1. Get id (epgId)
2. With epgId get schedule information en program information
3. Output information in console

== NOTES ==

DPDK code assignment

Todo:

-   What is PKG?
    -   Change node application into running software
    -   https://www.npmjs.com/package/pkg
-   GraphQL in depth - https://replatore.com/
    Goal:
-   Get 2 days information from NPO 1 HD and RTL 4 HD TV

Output:

-   Run and there is output
-   So no need for a running server

Channels -> returns all channels

How to get program of certain channel?

Je kan het schema ophalen en in het schema staat een koppeling naar de programma’s voor meer informatie

TODO:

1. Array with names
    1. Get id (epgId)
2. With epgId get schedule information en program information
3. Output information in console

GET CHANNEL
{
channel(filter:{title: "NPO 1 HD"}){
title
id
}
}
id: lgi-nl-prod-master:NL_000004_019461
{
channel(filter:{title: "RTL 4 HD"}){
title
id
}
}
Id: lgi-nl-prod-master:65535-NL_000004_019461

GET schedule information with a bit of program information

# Write your query or mutation here

{
schedules(filter: {o:"lgi-nl-prod-master:NL_000004_019461"}){
o
t
p{
title
}
}
}

2 dagn aan informatie nodig
Oudste Date is Tuesday, January 5, 2021
Informatie ophalen van oudste tijd + 3 dagen
