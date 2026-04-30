import type { IRacer } from '../types/types';

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
  if (racer.currentStars === 5) starColor = 'bg-yellow-300';
  else if (racer.currentStars === 6) starColor = 'bg-amber-500';
  else starColor = '';

  let superChargeColor;
  if (racer.superCharge) {
    if (racer.currentSuperChargeLevel === 1) superChargeColor = 'bg-[#32F1FF]';
    else if (racer.currentSuperChargeLevel === 2) superChargeColor = 'bg-gradient-to-tr from-[#ff54e8] to-[#32f1ff]';
    else superChargeColor = '';
  } else superChargeColor = '';

  //   console.log({ rarityColor, roleColor, starColor, superChargeColor });

  return { rarityColor, roleColor, starColor, superChargeColor };
}
