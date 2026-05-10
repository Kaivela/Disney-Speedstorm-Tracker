import type { ICrew, IRacer } from '../types/types';

export function getRacerTdColors(racer: IRacer) {
  let rarityColor;
  if (racer.rarity === 'Common') rarityColor = 'bg-[#25ffffb3]';
  // background-color: dark: #004f63b3 , light: #25ffffb3
  if (racer.rarity === 'Rare') rarityColor = 'bg-[#bb3aeeb3]';
  // background-color: dark: #5b0080b3 , light: #bb3aeeb3
  if (racer.rarity === 'Epic') rarityColor = 'bg-[#ff590db3]';
  // background-color: dark: #9f3200b3 , light: #ff590db3

  let roleColor;
  if (racer.role === 'Speedster') roleColor = 'bg-[#28d3fdb3]';
  // background-color: dark: #004f63b3 , light: #28d3fdb3
  if (racer.role === 'Brawler') roleColor = 'bg-[#ff5a5ab3]';
  // background-color: dark: #a20000b3 , light: #ff5a5ab3
  if (racer.role === 'Defender') roleColor = 'bg-[#21e221b3]';
  // background-color: dark: #006400b3 , light: #21e221b3
  if (racer.role === 'Trickster') roleColor = 'bg-[#e93fffb3]';
  // background-color: dark: #5b0080b3 , light: #e93fffb3

  let starColor;
  if (racer.currentStars === 5) starColor = 'bg-[#fde047b3]';
  else if (racer.currentStars === 6) starColor = 'bg-[#F59E0Bb3]';
  else starColor = '';

  let superChargeColor;
  if (racer.superCharge) {
    if (racer.currentSuperChargeLevel === 1) superChargeColor = 'bg-[#32F1FFb3]';
    else if (racer.currentSuperChargeLevel === 2) superChargeColor = 'bg-gradient-to-tr from-[#ff54e8b3] to-[#32f1ffb3]';
    else if (racer.currentSuperChargeLevel === 0) superChargeColor = 'bg-[#6EE7B7b3]';
  } else superChargeColor = 'bg-[#000000B3] text-[#FF0000B3] font-bold';

  let shardsColor;
  if (racer.shardsNeededToMax === 0) shardsColor = 'bg-[#000000B3] text-white';
  // zero = dark: bg : #bfceffb3, color: black
  //        light: bg: #000000B3, color: white
  else if (racer.shardsNeededToMax > 20 && racer.shardsNeededToMax <= 50) shardsColor = 'bg-[#FFFF00B3] text-black';
  // close = dark: bg : #A39000B3, color: #ffffffb3
  //         light: bg: #FFFF00B3, color: black
  else if (racer.shardsNeededToMax > 0 && racer.shardsNeededToMax <= 20) shardsColor = 'bg-[#FF0000B3] text-[#ffffffb3]';
  // warning = dark: bg : #A30202B3, color: #ffffffb3
  //           light: bg: #FF0000B3, color: white

  let superShardsNeededColor;
  if (racer.superChargeTokensNeeded === 0) superShardsNeededColor = 'bg-[#000000B3] text-white';
  else if (racer.superChargeTokensNeeded <= 50 && racer.superChargeTokensNeeded >= 41) superShardsNeededColor = 'bg-[#FFFF00B3] text-black';
  else if (racer.superChargeTokensNeeded <= 10) superShardsNeededColor = 'bg-[#FF0000B3] text-[#ffffffb3]';

  let currentSuperShardsColor;
  if (racer.superCharge) {
    if (racer.currentSuperChargeTokens === 0 && racer.superChargeTokensNeeded === 0) currentSuperShardsColor = 'bg-[#000000B3] text-white';
    else currentSuperShardsColor = '';
  } else currentSuperShardsColor = 'bg-[#000000B3] text-[#FF0000B3] font-bold';

  let shardsMPLColor;
  if (racer.shardsToGetInMPL === 0) shardsMPLColor = 'bg-[#000000B3] text-white';
  else shardsMPLColor = '';

  return { rarityColor, roleColor, starColor, superChargeColor, shardsColor, superShardsNeededColor, shardsMPLColor, currentSuperShardsColor };
}

export function getCrewTdColors(crew: ICrew) {
  let shardsColor;
  if (crew.shardsNeededToMax === 0) shardsColor = 'bg-[#000000B3] text-white';
  // zero = dark: bg : #bfceffb3, color: black
  //        light: bg: #000000B3, color: white
  else if (crew.shardsNeededToMax > 20 && crew.shardsNeededToMax <= 50) shardsColor = 'bg-[#FFFF00B3] text-black';
  // close = dark: bg : #A39000B3, color: #ffffffb3
  //         light: bg: #FFFF00B3, color: black
  else if (crew.rarity === 'Epic' && crew.shardsNeededToMax && crew.shardsNeededToMax > 0 && crew.shardsNeededToMax <= 25)
    shardsColor = 'bg-[#FF0000B3] text-[#ffffffb3]';
  else if (crew.shardsNeededToMax > 0 && crew.shardsNeededToMax <= 20) shardsColor = 'bg-[#FF0000B3] text-[#ffffffb3]';
  // warning = dark: bg : #A30202B3, color: #ffffffb3
  //           light: bg: #FF0000B3, color: white

  return { shardsColor };
}
