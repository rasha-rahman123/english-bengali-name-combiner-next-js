import { NextApiRequest, NextApiResponse } from "next";
import { transliterate as tr } from "transliteration";
import bnames from "../../utils/b_names.json";
import enames from "../../utils/e_names.json";
//@ts-ignore
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!bnames || !enames) {
      throw new Error("No Names Found");
    }
    const d = bnames[Math.floor(Math.random() * bnames.length)]["Name"];
    const english = enames[Math.floor(Math.random() * enames.length)];
    const j = d.includes(" ") ? d.substr(0, d.indexOf(" ")) : d;
    const e = tr(j);
    const isVowel: string[] = getSecondHalf(e);
    const isEnglishVowel: string[] = getSecondHalf(english);

    res.status(200).json({
      bengali: {
        original: d,
        transliterate: e,
        firstVowel: isVowel[0],
        distanceToRight: isVowel[1],
        firstConstanants: isVowel[3],
        distanceToLeft: isVowel[4],
        leftSide: isVowel[5].toLowerCase(),
        rightSide: isVowel[2].toLowerCase(),
      },
      english: {
        original: english,
        firstVowel: isEnglishVowel[0],
        distanceToRight: isEnglishVowel[1],
        firstConstanants: isEnglishVowel[3],
        distanceToLeft: isEnglishVowel[4],
        leftSide: isEnglishVowel[5].toLowerCase(),
        rightSide: isEnglishVowel[2].toLowerCase(),
      },
      combined: [
        isVowel[5].toLowerCase() + isEnglishVowel[2].toLowerCase(),
        isEnglishVowel[5].toLowerCase() + isVowel[2].toLowerCase(),
    ],
    });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: 'fail' });
  }
};

const getSecondHalf = (name: string) => {
  var j = name[Math.floor(name.length / 2)];
  var jr = name[Math.floor(name.length / 2)];
  var i = 1;
  var k = 1;
  while (!/^[aeiou]$/i.test(j)) {
    j = name[Math.floor(name.length / 2) + i];
    i++;
  }
  while (/^[aeiou]$/i.test(jr)) {
    jr = name[Math.floor(name.length / 2) - i];
    k++;
  }
  let final: string[] = [
    j,
    "" + (i - 1),
    name.substr(Math.floor(name.length / 2) + (i - 1)),
    jr,
    "" + (k - 1),
    name.substr(0, Math.floor(name.length / 2) + (i - 1)),
  ];

  return final;
};
