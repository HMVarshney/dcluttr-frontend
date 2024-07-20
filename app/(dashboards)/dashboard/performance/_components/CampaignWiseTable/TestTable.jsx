"use client"


import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    flexRender,
} from '@tanstack/react-table'
const rowData = [
    {
        "firstName": "Nicolette",
        "lastName": "Gutkowski",
        "age": 19,
        "visits": 400,
        "progress": 22,
        "status": "complicated",
        "subRows": [
            {
                "firstName": "Audreanne",
                "lastName": "Hartmann",
                "age": 14,
                "visits": 822,
                "progress": 64,
                "status": "single",
                "subRows": [
                    {
                        "firstName": "Rachelle",
                        "lastName": "Homenick",
                        "age": 23,
                        "visits": 458,
                        "progress": 93,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Felipa",
                        "lastName": "Bednar",
                        "age": 37,
                        "visits": 786,
                        "progress": 49,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Clair",
                        "lastName": "Rodriguez",
                        "age": 25,
                        "visits": 522,
                        "progress": 50,
                        "status": "complicated"
                    }
                ]
            },
            {
                "firstName": "Clemens",
                "lastName": "Bahringer",
                "age": 0,
                "visits": 12,
                "progress": 64,
                "status": "single",
                "subRows": [
                    {
                        "firstName": "Izaiah",
                        "lastName": "Parker-Ebert",
                        "age": 9,
                        "visits": 524,
                        "progress": 70,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Bailey",
                        "lastName": "Kassulke-Jenkins",
                        "age": 33,
                        "visits": 830,
                        "progress": 20,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Sydney",
                        "lastName": "Brakus",
                        "age": 39,
                        "visits": 337,
                        "progress": 78,
                        "status": "complicated"
                    }
                ]
            },
            {
                "firstName": "Kristina",
                "lastName": "Schuster",
                "age": 23,
                "visits": 376,
                "progress": 80,
                "status": "relationship",
                "subRows": [
                    {
                        "firstName": "Karlie",
                        "lastName": "Schinner",
                        "age": 39,
                        "visits": 719,
                        "progress": 30,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Bianka",
                        "lastName": "Anderson",
                        "age": 16,
                        "visits": 477,
                        "progress": 21,
                        "status": "single"
                    },
                    {
                        "firstName": "Lorena",
                        "lastName": "Haley",
                        "age": 2,
                        "visits": 15,
                        "progress": 64,
                        "status": "relationship"
                    }
                ]
            },
            {
                "firstName": "Abdullah",
                "lastName": "Rath",
                "age": 12,
                "visits": 229,
                "progress": 88,
                "status": "single",
                "subRows": [
                    {
                        "firstName": "Kaylin",
                        "lastName": "Balistreri",
                        "age": 11,
                        "visits": 71,
                        "progress": 73,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Nico",
                        "lastName": "Quitzon",
                        "age": 39,
                        "visits": 385,
                        "progress": 31,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Emmie",
                        "lastName": "Carter",
                        "age": 18,
                        "visits": 985,
                        "progress": 42,
                        "status": "relationship"
                    }
                ]
            },
            {
                "firstName": "Kara",
                "lastName": "Bechtelar",
                "age": 8,
                "visits": 420,
                "progress": 56,
                "status": "single",
                "subRows": [
                    {
                        "firstName": "Jaydon",
                        "lastName": "Rath",
                        "age": 30,
                        "visits": 844,
                        "progress": 73,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Mario",
                        "lastName": "White-Bergnaum",
                        "age": 9,
                        "visits": 461,
                        "progress": 39,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Sophia",
                        "lastName": "Schaden",
                        "age": 39,
                        "visits": 557,
                        "progress": 45,
                        "status": "relationship"
                    }
                ]
            }
        ]
    },
    {
        "firstName": "Dennis",
        "lastName": "Ratke",
        "age": 18,
        "visits": 457,
        "progress": 25,
        "status": "complicated",
        "subRows": [
            {
                "firstName": "Marcellus",
                "lastName": "Kertzmann-Wehner",
                "age": 6,
                "visits": 721,
                "progress": 58,
                "status": "single",
                "subRows": [
                    {
                        "firstName": "Irving",
                        "lastName": "Jerde",
                        "age": 35,
                        "visits": 945,
                        "progress": 74,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Noah",
                        "lastName": "Schowalter",
                        "age": 28,
                        "visits": 27,
                        "progress": 53,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Casimir",
                        "lastName": "Rice",
                        "age": 10,
                        "visits": 598,
                        "progress": 64,
                        "status": "complicated"
                    }
                ]
            },
            {
                "firstName": "Geovanni",
                "lastName": "Flatley",
                "age": 1,
                "visits": 943,
                "progress": 30,
                "status": "single",
                "subRows": [
                    {
                        "firstName": "Kaleigh",
                        "lastName": "Bayer",
                        "age": 37,
                        "visits": 345,
                        "progress": 22,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Mike",
                        "lastName": "Graham",
                        "age": 30,
                        "visits": 220,
                        "progress": 65,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Barry",
                        "lastName": "Schimmel",
                        "age": 13,
                        "visits": 118,
                        "progress": 9,
                        "status": "relationship"
                    }
                ]
            },
            {
                "firstName": "Irma",
                "lastName": "Farrell",
                "age": 4,
                "visits": 774,
                "progress": 16,
                "status": "complicated",
                "subRows": [
                    {
                        "firstName": "Sim",
                        "lastName": "O'Connell",
                        "age": 5,
                        "visits": 259,
                        "progress": 2,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Carlee",
                        "lastName": "Weissnat",
                        "age": 26,
                        "visits": 176,
                        "progress": 81,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Tito",
                        "lastName": "Kohler",
                        "age": 3,
                        "visits": 905,
                        "progress": 29,
                        "status": "relationship"
                    }
                ]
            },
            {
                "firstName": "Sheridan",
                "lastName": "Kautzer",
                "age": 33,
                "visits": 681,
                "progress": 28,
                "status": "single",
                "subRows": [
                    {
                        "firstName": "Chris",
                        "lastName": "Leffler",
                        "age": 4,
                        "visits": 115,
                        "progress": 90,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Sven",
                        "lastName": "Bruen",
                        "age": 12,
                        "visits": 405,
                        "progress": 30,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Enos",
                        "lastName": "Connelly",
                        "age": 13,
                        "visits": 457,
                        "progress": 96,
                        "status": "complicated"
                    }
                ]
            },
            {
                "firstName": "Green",
                "lastName": "Flatley",
                "age": 15,
                "visits": 903,
                "progress": 5,
                "status": "relationship",
                "subRows": [
                    {
                        "firstName": "Kadin",
                        "lastName": "Ullrich",
                        "age": 33,
                        "visits": 62,
                        "progress": 92,
                        "status": "single"
                    },
                    {
                        "firstName": "Rebeka",
                        "lastName": "Walker",
                        "age": 36,
                        "visits": 26,
                        "progress": 94,
                        "status": "single"
                    },
                    {
                        "firstName": "Vena",
                        "lastName": "McDermott",
                        "age": 8,
                        "visits": 109,
                        "progress": 35,
                        "status": "single"
                    }
                ]
            }
        ]
    },
    {
        "firstName": "America",
        "lastName": "Reichert",
        "age": 11,
        "visits": 357,
        "progress": 65,
        "status": "complicated",
        "subRows": [
            {
                "firstName": "Anabelle",
                "lastName": "Krajcik",
                "age": 34,
                "visits": 593,
                "progress": 69,
                "status": "relationship",
                "subRows": [
                    {
                        "firstName": "Ward",
                        "lastName": "Klocko",
                        "age": 14,
                        "visits": 502,
                        "progress": 17,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Sammy",
                        "lastName": "Becker",
                        "age": 35,
                        "visits": 741,
                        "progress": 1,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Alexis",
                        "lastName": "Zemlak-Johnson",
                        "age": 28,
                        "visits": 674,
                        "progress": 98,
                        "status": "complicated"
                    }
                ]
            },
            {
                "firstName": "Ricardo",
                "lastName": "Jakubowski",
                "age": 5,
                "visits": 632,
                "progress": 6,
                "status": "complicated",
                "subRows": [
                    {
                        "firstName": "Baron",
                        "lastName": "Gleason",
                        "age": 33,
                        "visits": 393,
                        "progress": 27,
                        "status": "single"
                    },
                    {
                        "firstName": "Tanya",
                        "lastName": "Lehner",
                        "age": 11,
                        "visits": 42,
                        "progress": 60,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Helmer",
                        "lastName": "Lueilwitz-Stehr",
                        "age": 16,
                        "visits": 751,
                        "progress": 2,
                        "status": "single"
                    }
                ]
            },
            {
                "firstName": "Maribel",
                "lastName": "Medhurst",
                "age": 34,
                "visits": 465,
                "progress": 52,
                "status": "complicated",
                "subRows": [
                    {
                        "firstName": "Samir",
                        "lastName": "Haley",
                        "age": 21,
                        "visits": 772,
                        "progress": 13,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Everett",
                        "lastName": "Baumbach",
                        "age": 10,
                        "visits": 222,
                        "progress": 36,
                        "status": "single"
                    },
                    {
                        "firstName": "Beryl",
                        "lastName": "Buckridge",
                        "age": 19,
                        "visits": 263,
                        "progress": 72,
                        "status": "relationship"
                    }
                ]
            },
            {
                "firstName": "Greg",
                "lastName": "Ankunding-Hilll",
                "age": 37,
                "visits": 307,
                "progress": 8,
                "status": "relationship",
                "subRows": [
                    {
                        "firstName": "Antonio",
                        "lastName": "Lockman",
                        "age": 34,
                        "visits": 110,
                        "progress": 76,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Raul",
                        "lastName": "Wuckert",
                        "age": 37,
                        "visits": 703,
                        "progress": 1,
                        "status": "single"
                    },
                    {
                        "firstName": "Antonio",
                        "lastName": "Bosco",
                        "age": 21,
                        "visits": 691,
                        "progress": 2,
                        "status": "single"
                    }
                ]
            },
            {
                "firstName": "Myron",
                "lastName": "Yundt",
                "age": 7,
                "visits": 852,
                "progress": 8,
                "status": "single",
                "subRows": [
                    {
                        "firstName": "Eddie",
                        "lastName": "Hirthe",
                        "age": 7,
                        "visits": 808,
                        "progress": 65,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Helena",
                        "lastName": "Fay",
                        "age": 12,
                        "visits": 849,
                        "progress": 66,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Bethel",
                        "lastName": "Adams",
                        "age": 16,
                        "visits": 27,
                        "progress": 42,
                        "status": "single"
                    }
                ]
            }
        ]
    },
    {
        "firstName": "Kitty",
        "lastName": "Wintheiser",
        "age": 26,
        "visits": 156,
        "progress": 94,
        "status": "complicated",
        "subRows": [
            {
                "firstName": "Kendrick",
                "lastName": "Quitzon",
                "age": 8,
                "visits": 145,
                "progress": 0,
                "status": "relationship",
                "subRows": [
                    {
                        "firstName": "Marjolaine",
                        "lastName": "Lubowitz",
                        "age": 11,
                        "visits": 838,
                        "progress": 71,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Shanon",
                        "lastName": "Stroman",
                        "age": 10,
                        "visits": 144,
                        "progress": 85,
                        "status": "single"
                    },
                    {
                        "firstName": "Sibyl",
                        "lastName": "Lueilwitz",
                        "age": 9,
                        "visits": 86,
                        "progress": 42,
                        "status": "relationship"
                    }
                ]
            },
            {
                "firstName": "Alek",
                "lastName": "Brekke",
                "age": 27,
                "visits": 629,
                "progress": 91,
                "status": "single",
                "subRows": [
                    {
                        "firstName": "Alvina",
                        "lastName": "Pouros",
                        "age": 26,
                        "visits": 511,
                        "progress": 75,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Greta",
                        "lastName": "Thiel",
                        "age": 5,
                        "visits": 929,
                        "progress": 28,
                        "status": "single"
                    },
                    {
                        "firstName": "Kiel",
                        "lastName": "King",
                        "age": 37,
                        "visits": 782,
                        "progress": 81,
                        "status": "relationship"
                    }
                ]
            },
            {
                "firstName": "Bernie",
                "lastName": "Kirlin",
                "age": 29,
                "visits": 245,
                "progress": 84,
                "status": "single",
                "subRows": [
                    {
                        "firstName": "Odell",
                        "lastName": "Roberts",
                        "age": 37,
                        "visits": 528,
                        "progress": 84,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Sandrine",
                        "lastName": "Treutel",
                        "age": 10,
                        "visits": 443,
                        "progress": 47,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Lavada",
                        "lastName": "Kautzer",
                        "age": 33,
                        "visits": 10,
                        "progress": 81,
                        "status": "single"
                    }
                ]
            },
            {
                "firstName": "Leif",
                "lastName": "Waelchi",
                "age": 1,
                "visits": 806,
                "progress": 26,
                "status": "single",
                "subRows": [
                    {
                        "firstName": "Helga",
                        "lastName": "Larson",
                        "age": 24,
                        "visits": 977,
                        "progress": 23,
                        "status": "single"
                    },
                    {
                        "firstName": "Furman",
                        "lastName": "Medhurst",
                        "age": 35,
                        "visits": 995,
                        "progress": 48,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Jovani",
                        "lastName": "Lehner",
                        "age": 6,
                        "visits": 554,
                        "progress": 24,
                        "status": "complicated"
                    }
                ]
            },
            {
                "firstName": "Bernadine",
                "lastName": "Dibbert",
                "age": 15,
                "visits": 654,
                "progress": 69,
                "status": "complicated",
                "subRows": [
                    {
                        "firstName": "Paula",
                        "lastName": "Luettgen",
                        "age": 37,
                        "visits": 385,
                        "progress": 85,
                        "status": "single"
                    },
                    {
                        "firstName": "Bobbie",
                        "lastName": "Fisher",
                        "age": 1,
                        "visits": 647,
                        "progress": 25,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Christ",
                        "lastName": "Lindgren",
                        "age": 10,
                        "visits": 967,
                        "progress": 1,
                        "status": "single"
                    }
                ]
            }
        ]
    },
    {
        "firstName": "Sibyl",
        "lastName": "Daniel",
        "age": 23,
        "visits": 82,
        "progress": 18,
        "status": "complicated",
        "subRows": [
            {
                "firstName": "Wilson",
                "lastName": "Block",
                "age": 1,
                "visits": 511,
                "progress": 96,
                "status": "single",
                "subRows": [
                    {
                        "firstName": "Sean",
                        "lastName": "Hayes",
                        "age": 29,
                        "visits": 698,
                        "progress": 60,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Maryse",
                        "lastName": "O'Kon",
                        "age": 23,
                        "visits": 604,
                        "progress": 76,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Mona",
                        "lastName": "Wolf",
                        "age": 3,
                        "visits": 64,
                        "progress": 64,
                        "status": "single"
                    }
                ]
            },
            {
                "firstName": "Walter",
                "lastName": "Schamberger",
                "age": 9,
                "visits": 743,
                "progress": 90,
                "status": "relationship",
                "subRows": [
                    {
                        "firstName": "Katlynn",
                        "lastName": "Collier",
                        "age": 2,
                        "visits": 69,
                        "progress": 65,
                        "status": "single"
                    },
                    {
                        "firstName": "Rudolph",
                        "lastName": "Abernathy",
                        "age": 24,
                        "visits": 337,
                        "progress": 87,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Harrison",
                        "lastName": "Carter",
                        "age": 12,
                        "visits": 464,
                        "progress": 33,
                        "status": "single"
                    }
                ]
            },
            {
                "firstName": "Brendan",
                "lastName": "Kulas",
                "age": 3,
                "visits": 801,
                "progress": 71,
                "status": "complicated",
                "subRows": [
                    {
                        "firstName": "Jeramie",
                        "lastName": "Prohaska",
                        "age": 12,
                        "visits": 940,
                        "progress": 70,
                        "status": "single"
                    },
                    {
                        "firstName": "Oswald",
                        "lastName": "Heaney",
                        "age": 36,
                        "visits": 965,
                        "progress": 40,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Simeon",
                        "lastName": "Runolfsson",
                        "age": 40,
                        "visits": 364,
                        "progress": 75,
                        "status": "single"
                    }
                ]
            },
            {
                "firstName": "Chasity",
                "lastName": "Effertz",
                "age": 37,
                "visits": 615,
                "progress": 50,
                "status": "complicated",
                "subRows": [
                    {
                        "firstName": "Elvie",
                        "lastName": "Schinner",
                        "age": 33,
                        "visits": 141,
                        "progress": 46,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Maggie",
                        "lastName": "Dach",
                        "age": 17,
                        "visits": 807,
                        "progress": 54,
                        "status": "single"
                    },
                    {
                        "firstName": "Thora",
                        "lastName": "Kunde",
                        "age": 8,
                        "visits": 180,
                        "progress": 55,
                        "status": "relationship"
                    }
                ]
            },
            {
                "firstName": "Eloise",
                "lastName": "Johnston",
                "age": 1,
                "visits": 535,
                "progress": 65,
                "status": "single",
                "subRows": [
                    {
                        "firstName": "Kasey",
                        "lastName": "Conn",
                        "age": 29,
                        "visits": 145,
                        "progress": 55,
                        "status": "single"
                    },
                    {
                        "firstName": "Jaiden",
                        "lastName": "Kuhn",
                        "age": 29,
                        "visits": 719,
                        "progress": 86,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Woodrow",
                        "lastName": "Konopelski",
                        "age": 17,
                        "visits": 0,
                        "progress": 48,
                        "status": "relationship"
                    }
                ]
            }
        ]
    },
    {
        "firstName": "Nova",
        "lastName": "Jenkins",
        "age": 0,
        "visits": 78,
        "progress": 26,
        "status": "complicated",
        "subRows": [
            {
                "firstName": "Aron",
                "lastName": "Hirthe",
                "age": 8,
                "visits": 293,
                "progress": 5,
                "status": "relationship",
                "subRows": [
                    {
                        "firstName": "Christ",
                        "lastName": "Osinski",
                        "age": 39,
                        "visits": 645,
                        "progress": 67,
                        "status": "single"
                    },
                    {
                        "firstName": "Joyce",
                        "lastName": "VonRueden",
                        "age": 2,
                        "visits": 66,
                        "progress": 83,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Emely",
                        "lastName": "Kihn",
                        "age": 16,
                        "visits": 919,
                        "progress": 80,
                        "status": "complicated"
                    }
                ]
            },
            {
                "firstName": "Sienna",
                "lastName": "Homenick",
                "age": 37,
                "visits": 557,
                "progress": 19,
                "status": "complicated",
                "subRows": [
                    {
                        "firstName": "Gaston",
                        "lastName": "Kris",
                        "age": 26,
                        "visits": 936,
                        "progress": 75,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Bret",
                        "lastName": "Kozey",
                        "age": 2,
                        "visits": 486,
                        "progress": 80,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Itzel",
                        "lastName": "Renner",
                        "age": 3,
                        "visits": 984,
                        "progress": 100,
                        "status": "relationship"
                    }
                ]
            },
            {
                "firstName": "Kiarra",
                "lastName": "Kozey",
                "age": 35,
                "visits": 566,
                "progress": 27,
                "status": "single",
                "subRows": [
                    {
                        "firstName": "Georgiana",
                        "lastName": "Weissnat",
                        "age": 25,
                        "visits": 24,
                        "progress": 83,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Ian",
                        "lastName": "Quitzon",
                        "age": 23,
                        "visits": 642,
                        "progress": 58,
                        "status": "single"
                    },
                    {
                        "firstName": "Carleton",
                        "lastName": "Mann",
                        "age": 8,
                        "visits": 753,
                        "progress": 24,
                        "status": "relationship"
                    }
                ]
            },
            {
                "firstName": "Mozelle",
                "lastName": "Koepp",
                "age": 37,
                "visits": 978,
                "progress": 18,
                "status": "relationship",
                "subRows": [
                    {
                        "firstName": "Waldo",
                        "lastName": "Wilderman",
                        "age": 5,
                        "visits": 558,
                        "progress": 45,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Beatrice",
                        "lastName": "O'Kon",
                        "age": 30,
                        "visits": 48,
                        "progress": 22,
                        "status": "single"
                    },
                    {
                        "firstName": "Donavon",
                        "lastName": "Watsica",
                        "age": 13,
                        "visits": 529,
                        "progress": 72,
                        "status": "single"
                    }
                ]
            },
            {
                "firstName": "Kolby",
                "lastName": "Schmidt-Franecki",
                "age": 3,
                "visits": 45,
                "progress": 47,
                "status": "complicated",
                "subRows": [
                    {
                        "firstName": "Brionna",
                        "lastName": "Windler",
                        "age": 3,
                        "visits": 562,
                        "progress": 51,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Leora",
                        "lastName": "Rolfson",
                        "age": 7,
                        "visits": 693,
                        "progress": 58,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Johann",
                        "lastName": "Kautzer",
                        "age": 13,
                        "visits": 174,
                        "progress": 74,
                        "status": "single"
                    }
                ]
            }
        ]
    },
    {
        "firstName": "Providenci",
        "lastName": "MacGyver-Bernhard",
        "age": 23,
        "visits": 850,
        "progress": 66,
        "status": "complicated",
        "subRows": [
            {
                "firstName": "Wellington",
                "lastName": "Fahey",
                "age": 11,
                "visits": 205,
                "progress": 41,
                "status": "relationship",
                "subRows": [
                    {
                        "firstName": "Pearlie",
                        "lastName": "Hintz",
                        "age": 18,
                        "visits": 508,
                        "progress": 48,
                        "status": "single"
                    },
                    {
                        "firstName": "Lysanne",
                        "lastName": "Kovacek",
                        "age": 20,
                        "visits": 547,
                        "progress": 67,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Dax",
                        "lastName": "Kilback",
                        "age": 37,
                        "visits": 25,
                        "progress": 82,
                        "status": "relationship"
                    }
                ]
            },
            {
                "firstName": "Angus",
                "lastName": "Mante",
                "age": 33,
                "visits": 203,
                "progress": 78,
                "status": "complicated",
                "subRows": [
                    {
                        "firstName": "Autumn",
                        "lastName": "Wisozk",
                        "age": 14,
                        "visits": 603,
                        "progress": 39,
                        "status": "single"
                    },
                    {
                        "firstName": "Tania",
                        "lastName": "Kovacek",
                        "age": 17,
                        "visits": 784,
                        "progress": 9,
                        "status": "single"
                    },
                    {
                        "firstName": "Murl",
                        "lastName": "Greenholt",
                        "age": 5,
                        "visits": 859,
                        "progress": 45,
                        "status": "relationship"
                    }
                ]
            },
            {
                "firstName": "Dessie",
                "lastName": "Heaney",
                "age": 18,
                "visits": 868,
                "progress": 30,
                "status": "relationship",
                "subRows": [
                    {
                        "firstName": "Otto",
                        "lastName": "O'Keefe",
                        "age": 2,
                        "visits": 426,
                        "progress": 48,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Jaime",
                        "lastName": "Satterfield",
                        "age": 20,
                        "visits": 35,
                        "progress": 32,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Wiley",
                        "lastName": "Kunde",
                        "age": 12,
                        "visits": 588,
                        "progress": 28,
                        "status": "relationship"
                    }
                ]
            },
            {
                "firstName": "Keagan",
                "lastName": "Emmerich",
                "age": 17,
                "visits": 72,
                "progress": 28,
                "status": "relationship",
                "subRows": [
                    {
                        "firstName": "Jules",
                        "lastName": "Zboncak",
                        "age": 0,
                        "visits": 122,
                        "progress": 77,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Giovanna",
                        "lastName": "Wyman",
                        "age": 38,
                        "visits": 781,
                        "progress": 71,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Vena",
                        "lastName": "Schoen",
                        "age": 10,
                        "visits": 182,
                        "progress": 77,
                        "status": "relationship"
                    }
                ]
            },
            {
                "firstName": "Columbus",
                "lastName": "Kuhic",
                "age": 15,
                "visits": 807,
                "progress": 48,
                "status": "complicated",
                "subRows": [
                    {
                        "firstName": "Alphonso",
                        "lastName": "Trantow",
                        "age": 26,
                        "visits": 617,
                        "progress": 38,
                        "status": "single"
                    },
                    {
                        "firstName": "Lester",
                        "lastName": "Jast",
                        "age": 7,
                        "visits": 933,
                        "progress": 6,
                        "status": "single"
                    },
                    {
                        "firstName": "Harmon",
                        "lastName": "Weimann",
                        "age": 25,
                        "visits": 88,
                        "progress": 26,
                        "status": "single"
                    }
                ]
            }
        ]
    },
    {
        "firstName": "Trystan",
        "lastName": "Dibbert",
        "age": 6,
        "visits": 706,
        "progress": 81,
        "status": "relationship",
        "subRows": [
            {
                "firstName": "Melody",
                "lastName": "Nicolas",
                "age": 6,
                "visits": 340,
                "progress": 88,
                "status": "complicated",
                "subRows": [
                    {
                        "firstName": "Laurence",
                        "lastName": "Heidenreich-Kub",
                        "age": 9,
                        "visits": 591,
                        "progress": 52,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Kelsi",
                        "lastName": "McKenzie",
                        "age": 37,
                        "visits": 664,
                        "progress": 27,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Rodolfo",
                        "lastName": "Kassulke",
                        "age": 36,
                        "visits": 633,
                        "progress": 33,
                        "status": "complicated"
                    }
                ]
            },
            {
                "firstName": "Jedediah",
                "lastName": "Deckow-Emard",
                "age": 19,
                "visits": 548,
                "progress": 88,
                "status": "relationship",
                "subRows": [
                    {
                        "firstName": "Adah",
                        "lastName": "Hegmann",
                        "age": 8,
                        "visits": 906,
                        "progress": 61,
                        "status": "single"
                    },
                    {
                        "firstName": "Myrtle",
                        "lastName": "Feeney",
                        "age": 3,
                        "visits": 586,
                        "progress": 24,
                        "status": "relationship"
                    },
                    {
                        "firstName": "Alexander",
                        "lastName": "Crooks",
                        "age": 0,
                        "visits": 327,
                        "progress": 80,
                        "status": "complicated"
                    }
                ]
            },
            {
                "firstName": "Andy",
                "lastName": "Zemlak",
                "age": 3,
                "visits": 947,
                "progress": 49,
                "status": "single",
                "subRows": [
                    {
                        "firstName": "Fletcher",
                        "lastName": "Hilll",
                        "age": 35,
                        "visits": 226,
                        "progress": 83,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Janie",
                        "lastName": "Hagenes",
                        "age": 13,
                        "visits": 596,
                        "progress": 52,
                        "status": "single"
                    },
                    {
                        "firstName": "Stella",
                        "lastName": "Stiedemann",
                        "age": 23,
                        "visits": 338,
                        "progress": 84,
                        "status": "single"
                    }
                ]
            },
            {
                "firstName": "Crawford",
                "lastName": "Macejkovic",
                "age": 6,
                "visits": 905,
                "progress": 65,
                "status": "single",
                "subRows": [
                    {
                        "firstName": "Sylvester",
                        "lastName": "Wilderman",
                        "age": 21,
                        "visits": 978,
                        "progress": 46,
                        "status": "single"
                    },
                    {
                        "firstName": "Amaya",
                        "lastName": "Fadel",
                        "age": 29,
                        "visits": 42,
                        "progress": 86,
                        "status": "single"
                    },
                    {
                        "firstName": "Derek",
                        "lastName": "Ratke",
                        "age": 32,
                        "visits": 95,
                        "progress": 94,
                        "status": "single"
                    }
                ]
            },
            {
                "firstName": "Ophelia",
                "lastName": "Feil",
                "age": 4,
                "visits": 759,
                "progress": 5,
                "status": "complicated",
                "subRows": [
                    {
                        "firstName": "Teresa",
                        "lastName": "Mayer",
                        "age": 37,
                        "visits": 392,
                        "progress": 63,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Boyd",
                        "lastName": "Hermann",
                        "age": 26,
                        "visits": 801,
                        "progress": 52,
                        "status": "complicated"
                    },
                    {
                        "firstName": "Jayme",
                        "lastName": "Rodriguez-Bahringer",
                        "age": 39,
                        "visits": 193,
                        "progress": 39,
                        "status": "single"
                    }
                ]
            }
        ]
    }
]
export default function TestTable() {
    const rerender = React.useReducer(() => ({}), {})[1]

    const columns = React.useMemo(
        () => [
            {
                accessorKey: 'firstName',
                header: ({ table }) => (
                    <>
                        <IndeterminateCheckbox
                            {...{
                                checked: table.getIsAllRowsSelected(),
                                indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler(),
                            }}
                        />{' '}
                        <button
                            {...{
                                onClick: table.getToggleAllRowsExpandedHandler(),
                            }}
                        >
                            {table.getIsAllRowsExpanded() ? '👇' : '👉'}
                        </button>{' '}
                        First Name
                    </>
                ),
                cell: ({ row, getValue }) => (
                    <div
                        style={{
                            // Since rows are flattened by default,
                            // we can use the row.depth property
                            // and paddingLeft to visually indicate the depth
                            // of the row
                            paddingLeft: `${row.depth * 2}rem`,
                        }}
                    >
                        <div>
                            <IndeterminateCheckbox
                                {...{
                                    checked: row.getIsSelected(),
                                    indeterminate: row.getIsSomeSelected(),
                                    onChange: row.getToggleSelectedHandler(),
                                }}
                            />{' '}
                            {row.getCanExpand() ? (
                                <button
                                    {...{
                                        onClick: row.getToggleExpandedHandler(),
                                        style: { cursor: 'pointer' },
                                    }}
                                >
                                    {row.getIsExpanded() ? '👇' : '👉'}
                                </button>
                            ) : (
                                '🔵'
                            )}{' '}
                            {getValue()}
                        </div>
                    </div>
                ),
                footer: props => props.column.id,
            },
            {
                accessorFn: row => row.lastName,
                id: 'lastName',
                cell: info => info.getValue(),
                header: () => <span>Last Name</span>,
                footer: props => props.column.id,
            },
            {
                accessorKey: 'age',
                header: () => 'Age',
                footer: props => props.column.id,
            },
            {
                accessorKey: 'visits',
                header: () => <span>Visits</span>,
                footer: props => props.column.id,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                footer: props => props.column.id,
            },
            {
                accessorKey: 'progress',
                header: 'Profile Progress',
                footer: props => props.column.id,
            },
        ],
        []
    )

    const [data, setData] = React.useState(() => rowData)
    const refreshData = () => setData(() => rowData)

    const [expanded, setExpanded] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        state: {
            expanded,
        },
        onExpandedChange: setExpanded,
        getSubRows: row => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        // filterFromLeafRows: true,
        // maxLeafRowFilterDepth: 0,
        debugTable: true,
    })

    return (
        <div className="p-2">
            <div className="h-2" />
            <Table className="rounded-md bg-white">
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <TableHead key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {header.column.getCanFilter() ? (
                                                    <div>
                                                        <Filter column={header.column} table={table} />
                                                    </div>
                                                ) : null}
                                            </div>
                                        )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <div className="h-2" />
            <div className="flex items-center gap-2">
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div>{table.getRowModel().rows.length} Rows</div>
            <div>
                <button onClick={() => rerender()}>Force Rerender</button>
            </div>
            <div>
                <button onClick={() => refreshData()}>Refresh Data</button>
            </div>
            <label>Expanded State:</label>
            <pre>{JSON.stringify(expanded, null, 2)}</pre>
            <label>Row Selection State:</label>
            <pre>{JSON.stringify(table.getState().rowSelection, null, 2)}</pre>
        </div>
    )
}

function Filter({
    column,
    table,
}) {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)

    const columnFilterValue = column.getFilterValue()

    return typeof firstValue === 'number' ? (
        <div className="flex space-x-2">
            <input
                type="number"
                value={(columnFilterValue)?.[0] ?? ''}
                onChange={e =>
                    column.setFilterValue((old) => [
                        e.target.value,
                        old?.[1],
                    ])
                }
                placeholder={`Min`}
                className="w-24 border shadow rounded"
            />
            <input
                type="number"
                value={(columnFilterValue)?.[1] ?? ''}
                onChange={e =>
                    column.setFilterValue((old) => [
                        old?.[0],
                        e.target.value,
                    ])
                }
                placeholder={`Max`}
                className="w-24 border shadow rounded"
            />
        </div>
    ) : (
        <input
            type="text"
            value={(columnFilterValue ?? '')}
            onChange={e => column.setFilterValue(e.target.value)}
            placeholder={`Search...`}
            className="w-36 border shadow rounded"
        />
    )
}

function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
}) {
    const ref = React.useRef(null)

    React.useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate])

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    )
}

