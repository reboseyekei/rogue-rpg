import React from "react";

function equipmentCheck(target) {
  if (
    target === "head" ||
    target === "upperBody" ||
    target === "lowerBody" ||
    target === "feet" ||
    target === "leftHand" ||
    target === "rightHand" ||
    target === "ringOne" ||
    target === "ringTwo"
  ) {
    return true;
  } else {
    return false;
  }
}

function compareType(one, two) {
  if (one === two) {
    return true;
  } else {
    return false;
  }
}

//Check if there are stats that an item gives in a certain category
function checkCategory(anchor, category) {
  if (category === "mind") {
    if (anchor.mind.cap || anchor.mind.creation || anchor.mind.destruction || anchor.mind.projection || anchor.mind.restoration) {
      return true;
    } else {
      return false;
    }
  } else if (category === "body") {
    if (anchor.body.cap || anchor.body.vitality || anchor.body.defense || anchor.body.strength || anchor.body.dexterity) {
      return true;
    } else {
      return false;
    }
  } else if (category === "soul") {
    if (anchor.soul.cap || anchor.soul.luck || anchor.soul.capacity || anchor.soul.clarity || anchor.soul.will) {
      return true;
    } else {
      return false;
    }
  }
}

function categoryDetails(itemId, anchor, category) {
  let details = [];
  if (category === "mind") {
    if (anchor.cap) {
      details.push(
        <h6 style={{ textAlign: "left", margin: 0, marginTop: "1px" }} key={`${itemId}-${category}-cap`}>
          {`+ ${anchor.cap} to `}
          <span style={{ color: "darkcyan", textDecoration: "underline" }}>Mind Cap</span>
        </h6>
      );
    }
    if (anchor.creation) {
      details.push(
        <h6 style={{ textAlign: "left", margin: 0, marginTop: "1px" }} key={`${itemId}-${category}-creation`}>
          {`+ ${anchor.creation} to `}
          <span style={{ color: "darkcyan", textDecoration: "underline" }}>Creation</span>
        </h6>
      );
    }
    if (anchor.destruction) {
      details.push(
        <h6 style={{ textAlign: "left", margin: 0, marginTop: "1px" }} key={`${itemId}-${category}-destruction`}>
          {`+ ${anchor.destruction} to `}
          <span style={{ color: "darkcyan", textDecoration: "underline" }}>Destrction</span>
        </h6>
      );
    }
    if (anchor.restoration) {
      details.push(
        <h6 style={{ textAlign: "left", margin: 0, marginTop: "1px" }} key={`${itemId}-${category}-restoration`}>
          {`+ ${anchor.restoration} to `}
          <span style={{ color: "darkcyan", textDecoration: "underline" }}>Restoration</span>
        </h6>
      );
    }
    if (anchor.projection) {
      details.push(
        <h6 style={{ textAlign: "left", margin: 0, marginTop: "1px" }} key={`${itemId}-${category}-projection`}>
          {`+ ${anchor.projection} to `}
          <span style={{ color: "darkcyan", textDecoration: "underline" }}>Projection</span>
        </h6>
      );
    }
  } else if (category === "body") {
    if (anchor.cap) {
      details.push(
        <h6 style={{ textAlign: "left", margin: 0, marginTop: "1px" }} key={`${itemId}-${category}-cap`}>
          {`+ ${anchor.cap} to `}
          <span style={{ color: "firebrick", textDecoration: "underline" }}>Body Cap</span>
        </h6>
      );
    }
    if (anchor.vitality) {
      details.push(
        <h6 style={{ textAlign: "left", margin: 0, marginTop: "1px" }} key={`${itemId}-${category}-vitality`}>
          {`+ ${anchor.vitality} to `}
          <span style={{ color: "firebrick", textDecoration: "underline" }}>Vitality</span>
        </h6>
      );
    }
    if (anchor.defense) {
      details.push(
        <h6 style={{ textAlign: "left", margin: 0, marginTop: "1px" }} key={`${itemId}-${category}-defense`}>
          {`+ ${anchor.defense} to `}
          <span style={{ color: "firebrick", textDecoration: "underline" }}>Defense</span>
        </h6>
      );
    }
    if (anchor.strength) {
      details.push(
        <h6 style={{ textAlign: "left", margin: 0, marginTop: "1px" }} key={`${itemId}-${category}-strength`}>
          {`+ ${anchor.strength} to `}
          <span style={{ color: "firebrick", textDecoration: "underline" }}>Strength</span>
        </h6>
      );
    }
    if (anchor.dexterity) {
      details.push(
        <h6 style={{ textAlign: "left", margin: 0, marginTop: "1px" }} key={`${itemId}-${category}-dexterity`}>
          {`+ ${anchor.dexterity} to `}
          <span style={{ color: "firebrick", textDecoration: "underline" }}>Dexterity</span>
        </h6>
      );
    }
  } else if (category === "soul") {
    if (anchor.cap) {
      details.push(
        <h6 style={{ textAlign: "left", margin: 0, marginTop: "1px" }} key={`${itemId}-${category}-cap`}>
          {`+ ${anchor.cap} to `}
          <span style={{ color: "darkorchid", textDecoration: "underline" }}>Soul Cap</span>
        </h6>
      );
    }
    if (anchor.luck) {
      details.push(
        <h6 style={{ textAlign: "left", margin: 0, marginTop: "1px" }} key={`${itemId}-${category}-luck`}>
          {`+ ${anchor.luck} to `}
          <span style={{ color: "darkorchid", textDecoration: "underline" }}>Luck</span>
        </h6>
      );
    }
    if (anchor.capacity) {
      details.push(
        <h6 style={{ textAlign: "left", margin: 0, marginTop: "1px" }} key={`${itemId}-${category}-capacity`}>
          {`+ ${anchor.capacity} to `}
          <span style={{ color: "darkorchid", textDecoration: "underline" }}>Capacity</span>
        </h6>
      );
    }
    if (anchor.clarity) {
      details.push(
        <h6 style={{ textAlign: "left", margin: 0, marginTop: "1px" }} key={`${itemId}-${category}-clarity`}>
          {`+ ${anchor.clarity} to `}
          <span style={{ color: "darkorchid", textDecoration: "underline" }}>Clarity</span>
        </h6>
      );
    }
    if (anchor.will) {
      details.push(
        <h6 style={{ textAlign: "left", margin: 0, marginTop: "1px" }} key={`${itemId}-${category}-will`}>
          {`+ ${anchor.will} to `}
          <span style={{ color: "darkorchid", textDecoration: "underline" }}>Will</span>
        </h6>
      );
    }
  }
  return details;
}

function sum(ob1, ob2) {
  let sum = {
    slots: ob1.slots,
    mind: {
      cap: 0 + ob1.mind.cap + ob2.mind.cap,
      creation: 0 + ob1.mind.creation + ob2.mind.creation,
      destruction: 0 + ob1.mind.destruction + ob2.mind.destruction,
      restoration: 0 + ob1.mind.restoration + ob2.mind.restoration,
      projection: 0 + ob1.mind.projection + ob2.mind.projection,
    },
    body: {
      cap: 0 + ob1.body.cap + ob2.body.cap,
      vitality: 0 + ob1.body.vitality + ob2.body.vitality,
      defense: 0 + ob1.body.defense + ob2.body.defense,
      strength: 0 + ob1.body.strength + ob2.body.strength,
      dexterity: 0 + ob1.body.dexterity + ob2.body.dexterity,
    },
    soul: {
      cap: 0 + ob1.soul.cap + ob2.soul.cap,
      luck: 0 + ob1.soul.luck + ob2.soul.luck,
      capacity: 0 + ob1.soul.capacity + ob2.soul.capacity,
      clarity: 0 + ob1.soul.clarity + ob2.soul.clarity,
      will: 0 + ob1.soul.will + ob2.soul.will,
    },
  };

  return sum;
}

function parseEquip(equip) {
  let parsed = {
    slots: 0 + equip.slots,
    mind: {
      cap: 0 + equip.mind.cap,
      creation: 0 + equip.mind.creation,
      destruction: 0 + equip.mind.destruction,
      restoration: 0 + equip.mind.restoration,
      projection: 0 + +equip.mind.projection,
    },
    body: {
      cap: 0 + equip.body.cap,
      vitality: 0 + equip.body.vitality,
      defense: 0 + equip.body.defense,
      strength: 0 + equip.body.strength,
      dexterity: 0 + equip.body.dexterity,
    },
    soul: {
      cap: 0 + equip.soul.cap,
      luck: 0 + equip.soul.luck,
      capacity: 0 + equip.soul.capacity,
      clarity: 0 + equip.soul.clarity,
      will: 0 + equip.soul.will,
    },
  };
  return parsed;
}

function initEquip() {
  return {
    slots: 0,
    mind: {
      cap: 0,
      creation: 0,
      destruction: 0,
      restoration: 0,
      projection: 0,
    },
    body: {
      cap: 0,
      vitality: 0,
      defense: 0,
      strength: 0,
      dexterity: 0,
    },
    soul: {
      cap: 0,
      luck: 0,
      capacity: 0,
      clarity: 0,
      will: 0,
    },
  };
}

function parseTotalStats(character, equipped) {
  return {
    slots: character.slots + equipped.slots,
    mind: {
      cap: character.mind.cap + equipped.mind.cap,
      creation: character.mind.creation + equipped.mind.creation,
      destruction: character.mind.destruction + equipped.mind.destruction,
      restoration: character.mind.restoration + equipped.mind.restoration,
      projection: character.mind.projection + equipped.mind.projection,
    },
    body: {
      cap: character.body.cap + equipped.body.cap,
      vitality: character.body.vitality + equipped.body.vitality,
      defense: character.body.defense + equipped.body.defense,
      strength: character.body.strength + equipped.body.strength,
      dexterity: character.body.dexterity + equipped.body.dexterity,
    },
    soul: {
      cap: character.soul.cap + equipped.soul.cap,
      luck: character.soul.luck + equipped.soul.luck,
      capacity: character.soul.capacity + equipped.soul.capacity,
      clarity: character.soul.clarity + equipped.soul.clarity,
      will: character.soul.will + equipped.soul.will,
    },
    attributes: {
      space: {
        default: character.attributes.space.default,
        mod: character.attributes.space.mod,
        total: character.attributes.space.default + character.attributes.space.mod,
      },
      time: {
        default: character.attributes.time.default,
        mod: character.attributes.time.mod,
        total: character.attributes.time.default + character.attributes.time.mod,
      },
      death: {
        default: character.attributes.death.default,
        mod: character.attributes.death.mod,
        total: character.attributes.death.default + character.attributes.death.mod,
      },
      life: {
        default: character.attributes.life.default,
        mod: character.attributes.life.mod,
        total: character.attributes.life.default + character.attributes.life.mod,
      },
      fire: {
        default: character.attributes.fire.default,
        mod: character.attributes.fire.mod,
        total: character.attributes.fire.default + character.attributes.fire.mod,
      },
      water: {
        default: character.attributes.water.default,
        mod: character.attributes.water.mod,
        total: character.attributes.water.default + character.attributes.water.mod,
      },
      earth: {
        default: character.attributes.earth.default,
        mod: character.attributes.earth.mod,
        total: character.attributes.earth.default + character.attributes.earth.mod,
      },
      air: {
        default: character.attributes.air.default,
        mod: character.attributes.air.mod,
        total: character.attributes.air.default + character.attributes.air.mod,
      },
    },
    buffs: {
      regen: {
        default: character.buffs.regen.default,
        mod: character.buffs.regen.mod,
        total: character.buffs.regen.default + character.buffs.regen.mod,
      },
      dread: {
        default: character.buffs.dread.default,
        mod: character.buffs.dread.mod,
        total: character.buffs.dread.default + character.buffs.dread.mod,
      },
      poison: {
        default: character.buffs.poison.default,
        mod: character.buffs.poison.mod,
        total: character.buffs.poison.default + character.buffs.poison.mod,
      },
      scorch: {
        default: character.buffs.scorch.default,
        mod: character.buffs.scorch.mod,
        total: character.buffs.scorch.default + character.buffs.scorch.mod,
      },
      cold: {
        default: character.buffs.cold.default,
        mod: character.buffs.cold.mod,
        total: character.buffs.cold.default + character.buffs.cold.mod,
      },
      spark: {
        default: character.buffs.spark.default,
        mod: character.buffs.spark.mod,
        total: character.buffs.spark.default + character.buffs.spark.mod,
      },
      reflect: {
        default: character.buffs.reflect.default,
        mod: character.buffs.reflect.mod,
        total: character.buffs.reflect.default + character.buffs.reflect.mod,
      },
      summon: {
        default: character.buffs.summon.default,
        mod: character.buffs.summon.mod,
        total: character.buffs.summon.default + character.buffs.summon.mod,
      },
      taunt: {
        default: character.buffs.taunt.default,
        mod: character.buffs.taunt.mod,
        total: character.buffs.taunt.default + character.buffs.taunt.mod,
      },
      flee: {
        default: character.buffs.flee.default,
        mod: character.buffs.flee.mod,
        total: character.buffs.flee.default + character.buffs.flee.mod,
      },
      immortal: character.buffs.immortal,
      strong: character.buffs.strong,
      warped: character.buffs.warped,
      sniper: character.buffs.sniper,
      wellspring: character.buffs.wellpsring,
      overcharged: character.buffs.overcharged,
      scavenger: character.buffs.scavenger,
      swift: character.buffs.swift,
    },
    debuffs: {
      fear: {
        default: character.debuffs.fear.default,
        mod: character.debuffs.fear.mod,
        total: character.debuffs.fear.default + character.debuffs.fear.mod,
      },
      burn: {
        default: character.debuffs.burn.default,
        mod: character.debuffs.burn.mod,
        total: character.debuffs.burn.default + character.debuffs.burn.mod,
      },
      freeze: {
        default: character.debuffs.freeze.default,
        mod: character.debuffs.freeze.mod,
        total: character.debuffs.freeze.default + character.debuffs.freeze.mod,
      },
      shock: {
        default: character.debuffs.shock.default,
        mod: character.debuffs.shock.mod,
        total: character.debuffs.shock.default + character.debuffs.shock.mod,
      },
      toxin: {
        default: character.debuffs.toxin.default,
        mod: character.debuffs.toxin.mod,
        total: character.debuffs.toxin.default + character.debuffs.toxin.mod,
      },
      decay: {
        default: character.debuffs.decay.default,
        mod: character.debuffs.decay.mod,
        total: character.debuffs.decay.default + character.debuffs.decay.mod,
      },
      bleed: {
        default: character.debuffs.bleed.default,
        mod: character.debuffs.bleed.mod,
        total: character.debuffs.bleed.default + character.debuffs.bleed.mod,
      },
      exhaustion: {
        default: character.debuffs.exhaustion.default,
        mod: character.debuffs.exhaustion.mod,
        total: character.debuffs.exhaustion.default + character.debuffs.exhaustion.mod,
      },
      explosion: character.debuffs.explosion,
      paralysis: character.debuffs.paralysis,
      frozen: character.debuffs.frozen,
      scorched: character.debuffs.scorched,
      sleep: character.debuffs.sleep,
    },
    health: {
      current: 0,
      max: 0,
    },
    mana: {
      current: 0,
      max: 0,
    },
    stamina: {
      current: 0,
      max: 0,
    },
    shield: {
      current: 0,
      max: 0,
    },
  };
}

//Gets all the stats that equipment gives
function parseEquipped(equipped) {
  let init = initEquip();
  let head = initEquip();
  let upperBody = initEquip();
  let lowerBody = initEquip();
  let feet = initEquip();
  let leftHand = initEquip();
  let rightHand = initEquip();
  let ringOne = initEquip();
  let ringTwo = initEquip();

  if (equipped.head) {
    head = parseEquip(equipped.head);
  }
  if (equipped.upperBody) {
    upperBody = parseEquip(equipped.upperBody);
  }
  if (equipped.lowerBody) {
    lowerBody = parseEquip(equipped.lowerBody);
  }
  if (equipped.feet) {
    feet = parseEquip(equipped.feet);
  }
  if (equipped.leftHand) {
    leftHand = parseEquip(equipped.leftHand);
  }
  if (equipped.rightHand) {
    rightHand = parseEquip(equipped.rightHand);
  }
  if (equipped.ringOne) {
    ringOne = parseEquip(equipped.ringOne);
  }
  if (equipped.ringTwo) {
    ringTwo = parseEquip(equipped.ringTwo);
  }

  let total = sum(init, head);
  total = sum(total, upperBody);
  total = sum(total, lowerBody);
  total = sum(total, feet);
  total = sum(total, leftHand);
  total = sum(total, rightHand);
  total = sum(total, ringOne);
  total = sum(total, ringTwo);
  return total;
}

function abilityArray(slots) {
  let slotsToMap = [];
  if (slots >= 1) {
    slotsToMap.push("slotOne");
  }
  if (slots >= 2) {
    slotsToMap.push("slotTwo");
  }
  if (slots >= 3) {
    slotsToMap.push("slotThree");
  }
  if (slots >= 4) {
    slotsToMap.push("slotFour");
  }
  if (slots >= 5) {
    slotsToMap.push("slotFive");
  }
  if (slots >= 6) {
    slotsToMap.push("slotSix");
  }
  if (slots >= 7) {
    slotsToMap.push("slotSeven");
  }
  if (slots >= 8) {
    slotsToMap.push("slotEight");
  }
  if (slots >= 9) {
    slotsToMap.push("slotNine");
  }
  if (slots >= 10) {
    slotsToMap.push("slotTen");
  }
  if (slots >= 11) {
    slotsToMap.push("slotEleven");
  }
  if (slots >= 12) {
    slotsToMap.push("slotTwelve");
  }
  if (slots >= 13) {
    slotsToMap.push("slotThirteen");
  }
  if (slots >= 14) {
    slotsToMap.push("slotFourteen");
  }
  if (slots >= 15) {
    slotsToMap.push("slotFifteen");
  }
  if (slots >= 16) {
    slotsToMap.push("slotSixteen");
  }
  if (slots >= 17) {
    slotsToMap.push("slotSeventeen");
  }
  if (slots >= 18) {
    slotsToMap.push("slotEighteen");
  }
  if (slots >= 19) {
    slotsToMap.push("slotNineteen");
  }
  if (slots >= 20) {
    slotsToMap.push("slotTwenty");
  }
  return slotsToMap;
}

//ABILITY MAPPING
function parseDivision(anchor) {
  let division = [];
  if (anchor) {
    anchor.max && division.push("max");
    anchor.current && division.push("current");
    anchor.division && division.push("division");
  }
  return division;
}

function parseCategory(anchor, target, scale) {
  let category = [];

  let mind = ["cap", "creation", "destruction", "restoration", "projection"];
  let body = ["cap", "vitality", "defense", "strength", "dexterity"];
  let soul = ["cap", "luck", "capacity", "clarity", "will"];
  let chosenCategory;
  if (target === "mind" || target === "mindRepeat") chosenCategory = mind;
  else if (target === "body" || target === "bodyRepeat") chosenCategory = body;
  else if (target === "soul" || target === "soulRepeat") chosenCategory = soul;

  //Uses the category chosenCategorys above (mind, body, soul)
  if (anchor && !scale) {
    anchor[chosenCategory[0]] && category.push(`${chosenCategory[0]}`);
    anchor[chosenCategory[1]] && category.push(`${chosenCategory[1]}`);
    anchor[chosenCategory[2]] && category.push(`${chosenCategory[2]}`);
    anchor[chosenCategory[3]] && category.push(`${chosenCategory[3]}`);
    anchor[chosenCategory[4]] && category.push(`${chosenCategory[4]}`);
  } else if (anchor && scale) {
    anchor[chosenCategory[0]] && category.push(`${target}.${chosenCategory[0]}`);
    anchor[chosenCategory[1]] && category.push(`${target}.${chosenCategory[1]}`);
    anchor[chosenCategory[2]] && category.push(`${target}.${chosenCategory[2]}`);
    anchor[chosenCategory[3]] && category.push(`${target}.${chosenCategory[3]}`);
    anchor[chosenCategory[4]] && category.push(`${target}.${chosenCategory[4]}`);
  }

  return category;
}

function parseAlter(anchor, anchorName, target) {
  let alter;
  //If an alter has the default value and the mod value,
  //then that means that they should be differentiated in scaling
  //If there is only a default value, then default and mod alter values should not be differentiated
  let value = anchor[anchorName][target]
  if (value) {
    if ((value.default && value.mod) || value.mod === 0) {
      alter=[];
      alter.push(`${anchorName}.${target}.default`);
      alter.push(`${anchorName}.${target}.mod`);
    }
    if (value.default && !value.mod) {
      alter= `${anchorName}.${target}.default`;
    }
  }
  return alter;
}

function parseAttributes(anchor) {
  let attributes = [];

  if (anchor.attributes) {
    if (anchor.attributes.space) attributes = attributes.concat(parseAlter(anchor, "attributes", "space"));
    if (anchor.attributes.time) attributes = attributes.concat(parseAlter(anchor, "attributes", "time"));
    if (anchor.attributes.death) attributes = attributes.concat(parseAlter(anchor, "attributes", "death"));
    if (anchor.attributes.life) attributes = attributes.concat(parseAlter(anchor, "attributes", "life"));
    if (anchor.attributes.fire) attributes = attributes.concat(parseAlter(anchor, "attributes", "fire"));
    if (anchor.attributes.water) attributes = attributes.concat(parseAlter(anchor, "attributes", "water"));
    if (anchor.attributes.earth) attributes = attributes.concat(parseAlter(anchor, "attributes", "earth"));
    if (anchor.attributes.air) attributes = attributes.concat(parseAlter(anchor, "attributes", "air"));
  }

  return attributes;
}

function parseBuffs(anchor) {
  let buffs = [];
  
  if (anchor.buffs) {
    //Value buffs require parseAlter
    if (anchor.buffs.regen) buffs = buffs.concat(parseAlter(anchor, "buffs", "regen"));
    if (anchor.buffs.dread) buffs = buffs.concat(parseAlter(anchor, "buffs", "dread"));
    if (anchor.buffs.poison) buffs = buffs.concat(parseAlter(anchor, "buffs", "poison"));
    if (anchor.buffs.scorch) buffs = buffs.concat(parseAlter(anchor, "buffs", "scorch"));
    if (anchor.buffs.cold) buffs = buffs.concat(parseAlter(anchor, "buffs", "cold"));
    if (anchor.buffs.spark) buffs = buffs.concat(parseAlter(anchor, "buffs", "spark"));
    if (anchor.buffs.reflect) buffs = buffs.concat(parseAlter(anchor, "buffs", "reflect"));
    if (anchor.buffs.taunt) buffs = buffs.concat(parseAlter(anchor, "buffs", "taunt"));
    if (anchor.buffs.flee) buffs = buffs.concat(parseAlter(anchor, "buffs", "flee"));

    //Timed buffs are just ints
    anchor.buffs.immortal && buffs.push(`buffs.immortal`);
    anchor.buffs.strong && buffs.push(`buffs.strong`);
    anchor.buffs.warped && buffs.push(`buffs.warped`);
    anchor.buffs.sniper && buffs.push(`buffs.sniper`);
    anchor.buffs.overcharged && buffs.push(`buffs.overcharged`);
    anchor.buffs.scavenger && buffs.push(`buffs.scavenger`);
    anchor.buffs.swift && buffs.push(`buffs.swift`);
  }

  return buffs;
}

function parseDebuffs(anchor) {
  let debuffs = [];

  if (anchor.debuffs) {
    //Value debuffs require parseAlter
    if (anchor.debuffs.fear) debuffs = debuffs.concat(parseAlter(anchor, "debuffs", "fear"));
    if (anchor.debuffs.burn) debuffs = debuffs.concat(parseAlter(anchor, "debuffs", "burn"));
    if (anchor.debuffs.freeze) debuffs = debuffs.concat(parseAlter(anchor, "debuffs", "freeze"));
    if (anchor.debuffs.shock) debuffs = debuffs.concat(parseAlter(anchor, "debuffs", "shock"));
    if (anchor.debuffs.toxin) debuffs = debuffs.concat(parseAlter(anchor, "debuffs", "toxin"));
    if (anchor.debuffs.decay) debuffs = debuffs.concat(parseAlter(anchor, "debuffs", "decay"));
    if (anchor.debuffs.bleed) debuffs = debuffs.concat(parseAlter(anchor, "debuffs", "bleed"));
    if (anchor.debuffs.exhaustion) debuffs = debuffs.concat(parseAlter(anchor, "debuffs", "exhaustion"));

    //Timed debuffs are just ints
    anchor.debuffs.exploison && debuffs.push(`debuffs.exploison`);
    anchor.debuffs.paralysis && debuffs.push(`debuffs.paralysis`);
    anchor.debuffs.frozen && debuffs.push(`debuffs.frozen`);
    anchor.debuffs.scorched && debuffs.push(`debuffs.scorched`);
    anchor.debuffs.sleep && debuffs.push(`debuffs.sleep`);
  }

  return debuffs;
}

function parseScalers(anchor) {
  let scalers = [];
  if (anchor.health) scalers = scalers.concat(parseDivision(anchor.health));
  if (anchor.shield) scalers = scalers.concat(parseDivision(anchor.shield));
  if (anchor.mana) scalers = scalers.concat(parseDivision(anchor.mana));
  if (anchor.stamina) scalers = scalers.concat(parseDivision(anchor.stamina));
  if (anchor.mind) scalers = scalers.concat(parseCategory(anchor.mind, "mind", true));
  if (anchor.body) scalers = scalers.concat(parseCategory(anchor.body, "body", true));
  if (anchor.soul) scalers = scalers.concat(parseCategory(anchor.soul, "soul", true));

  //For attributes, buffs, and debuffs, make sure to submit the anchor[target] instead of just anchor as parameters
  if (anchor.attributes) scalers = scalers.concat(parseAttributes(anchor));
  if (anchor.buffs) scalers = scalers.concat(parseBuffs(anchor));
  if (anchor.debuffs) scalers = scalers.concat(parseDebuffs(anchor));

  if (anchor.scaled) scalers.push("scaled");
  if (anchor.value) scalers.push("value");

  return scalers;
}

function parseModifier(anchor, target) {
  let modifier = [];
  anchor.target && modifier.push("target");
  anchor.scale && modifier.push(parseScalers(anchor.scale));
  return modifier;
}

function parseModifiers(anchor, target) {
  let modifiers = [];
  for (let i = 0; i < anchor.length; i++) {
    if (anchor[i]) modifiers[i] = parseModifier(anchor[i]);
  }
  return modifiers;
}

function parseEffect(anchor) {
  //anchor is ability.effects while target is the index
  let effect = [];
  effect.push(`name`);
  effect.push(`target`);
  effect.push(`turns`);

  //Passing down the string onto parseModifiers, so it can store the location further down
  if (anchor.modifiers) effect.push(parseModifiers(anchor.modifiers));
  return effect;
}

function parseEffects(anchor) {
  let effects = [];
  for (let i = 0; i < anchor.length; i++) {
    if (anchor[i]) effects.push(parseEffect(anchor[i]));
  }
  return effects;
}

function parseFields(anchor) {
  let fields = [];
  let check = [
    "healthCost",
    "manaCost",
    "staminaCost",
    "shieldCost",
    "mindReq",
    "bodyReq",
    "soulReq",
    "damage",
    "health",
    "healthGain",
    "manaGain",
    "staminaGain",
    "shieldGain",
    "mana",
    "stamina",
    "shield",
    "repeatable",
    "mindRepeat",
    "bodyRepeat",
    "soulRepeat",
    "effects",
  ];

  for (let i = 0; i < check.length; i++) {
    if(check[i] === "effects"){
      anchor[check[i]].length > 0 && fields.push(check[i])
    } else {
      anchor[check[i]] && fields.push(check[i]);
    }
  }
  return fields;
}

function parseTarget(anchor, target) {
  let integers = ["healthCost", "manaCost", "staminaCost", "shieldCost", "mindReq", "bodyReq", "soulReq"];
  let divisions = ["repeatable"];
  let categories = ["mindRepeat", "bodyRepeat", "soulRepeat"];
  let effects = ["effects"];
  let scales = ["damage", "healthGain", "manaGain", "staminaGain", "shieldGain"];

  let dictionary = [integers, scales, divisions, categories, effects];
  let decision;
  let parse = [];

  for (let i = 0; i < dictionary.length; i++) {
    for (let j = 0; j < dictionary[i].length; j++) {
      if (target === dictionary[i][j]) {
        //i is a reference to the category in the dictionary array, used below
        decision = i;
      }
    }
  }

  if (decision === 0) {
    //If it's an integer we'll just send the integer back, no need to parse
    if (anchor[target]) return anchor[target];
  } else if (decision === 1) {
    //It was a scale
    if (anchor[target]) parse = parse.concat(parseScalers(anchor[target]));
  } else if (decision === 2) {
    //If it was a division
    if (anchor[target]) parse = parse.concat(parseDivision(anchor[target]));
  } else if (decision === 3) {
    //If it was a category (mind, body soul)
    if (anchor[target]) parse = parse.concat(parseCategory(anchor[target], target, false));
  } else if (decision === 4) {
    //If it was a effect
    if (anchor[target]) parse = parse.concat(parseEffects(anchor[target]));
  }

  return parse;
}

function parseScaleField(anchor, target, values, total, targetText, altName) {
  let details = ["", []];
  //checks to see if its a healthGain, manaGain, etc instead of damage scale. scaleWords[1] === "Gain", means its the former
  let scaleWords = target.split(/(?=[A-Z])/);
  let totalMultiplier = 1;
  let alt = target;
  if (altName) alt = altName;
  for (let scope = 0; scope < values.length; scope++) {
    //scaled checks if a scale has scaling values
    if (!anchor[target].scaled && values[scope] === "value") {
      //ex: Restores 5 health on self.
      if (scaleWords[1] === "Gain" && anchor[target].value > 0) details[0] = `Restores ${anchor[target].value} ${alt}.`;
      //ex: Destroys 5 health on self.
      else if (scaleWords[1] === "Gain" && anchor[target].value < 0) details[0] = `Destroys ${anchor[target].value} ${alt}.`;
      //ex: - applies 5 fear on self.
      else if (altName) details[0] = `- applies ${anchor[target].value} ${alt} on ${targetText}.`;
      //ex: Deals 5 damage on self.
      else details[0] = `Deals ${anchor[target].value} ${alt} on ${targetText}`;
    } else if (anchor[target].scaled && values[scope] === "value") {
      //ex: Restores a minimum of 5 health.
      if (scaleWords[1] === "Gain" && anchor[target].value > 0) details[0] = `Restores a minimum of ${anchor[target].value} ${scaleWords[0]}.`;
      //ex: Destroys a minimum of 5 health.
      else if (scaleWords[1] === "Gain" && anchor[target].value < 0) details[0] = `Destroys a minimum of ${anchor[target].value} ${scaleWords[0]}.`;
      //ex: - applies a minimum of 5 fear.
      else if (altName) details[0] = `- applies a minimum of ${anchor[target].value} ${alt} on ${targetText}.`;
      //ex: Deals a minimum of 5 damage.
      else details[0] = `Deals a minimum of ${anchor[target].value} ${alt} on ${targetText}.`;
    } else if (anchor[target].scaled && values[scope] !== "value" && values[scope] !== "scaled") {
      //Splits words like mind.cap and so on
      let scale = values[scope].split(".");
      //ex: + 1x fireball damage multiplier for every 10 mind cap
      if(scaleWords.length > 1) {
        let secondaryWord = scaleWords[1].toLowerCase() + "ed";
        details[1].push(`+ 1x ${scaleWords[0]} ${secondaryWord} for every ${anchor[target][scale[0]][scale[1]]} ${scale[0]} ${scale[1]}.`);
        totalMultiplier += Math.floor(total[scale[0]][scale[1]] / anchor[target][scale[0]][scale[1]]);
      }
      else if(scale.length === 2){
        details[1].push(`+ 1x ${alt ? alt : anchor.tag} multiplier for every ${anchor[target][scale[0]][scale[1]]} ${scale[0]} ${scale[1]}.`);
        totalMultiplier += Math.floor(total[scale[0]][scale[1]] / anchor[target][scale[0]][scale[1]]);
      } else if(scale.length === 3) {
        details[1].push(`+ 1x ${alt ? alt : anchor.tag} multiplier for every ${anchor[target][scale[0]][scale[1]][scale[2]]} points in ${scale[1]} (${scale[0]}).`);
        totalMultiplier += Math.floor(total[scale[0]][scale[1]][scale[2]] / anchor[target][scale[0]][scale[1]][scale[2]]);
      }

    }
    if (totalMultiplier > 1) {
      let finalValue = totalMultiplier * anchor[target].value;
      if (scaleWords[1] === "Gain" && anchor[target].value > 0) details[0] = details[0] + ` Will restore ${finalValue} ${alt}`;
      if (scaleWords[1] === "Gain" && anchor[target].value < 0) details[0] = details[0] + ` Will destroy ${finalValue} ${alt}`;
      if (altName) details[0] = details[0] + ` Will apply ${finalValue} ${alt}`;
      else details[0] = details[0] + ` Will deal ${finalValue} ${alt}`;
    }
  }

  return details;
}

function parseField(anchor, target, values, total, extra, extraValues) {
  //Function explanation:
  //This function uses the processed fields and targets from parseTarget and parseFields, to generate the actual text that will be displayed

  //Parameter explanation:
  //anchor is character.abilities[slot].ability; it is the actual data
  //target is the string which classifies what we want out of the anchor
  //ex: target = "healthCost", anchor[target] is equivalent to character.abilities[slot].ability.healthCost

  //values is all the possible fields associated with the target, that we should check
  //ex: target="repeatable", values = ["max", "current"]

  //extra is the associated targets that are deeply related to the target
  //ex: target="repeatable", extra="mindRepeat"

  //Lists what targets are in certain fields
  let integers = ["healthCost", "manaCost", "staminaCost", "shieldCost", "mindReq", "bodyReq", "soulReq"];
  let divisions = ["repeatable"];
  let effects = ["effects"];
  let scales = ["damage", "healthGain", "manaGain", "staminaGain", "shieldGain"];
  let dictionary = [integers, scales, divisions, effects];

  //Stores data from above
  let decision;

  //Finds what kind of field a target is
  for (let i = 0; i < dictionary.length; i++) {
    for (let j = 0; j < dictionary[i].length; j++) {
      if (target === dictionary[i][j]) {
        decision = i;
      }
    }
  }

  //details is what is returned, it will typically have two arrays inside.
  //One with the main details that correspond to target while the other is the auxillary details that correspond to extra
  let details = [];

  //Goes through each field, if target was it, it will parse the data and store it in details
  //extra details:
  // anchor usually represents the data, like character.abilities in this case it's character.abilities[slot].ability
  // target usually represents the string that grabs from the details as so: anchor[target]
  // scope is what is taken out of the target, if the target has many underlying fields
  if (decision === 0) {
    //is an integer
    let words = target.split(/(?=[A-Z])/);
    if (words[1] === "Cost") {
      //ex: Costs 5 stamina
      return `Costs ${anchor[target]} ${words[0]}`;
    } else if (words[1] === "Req") {
      //ex: 10 mind cap is required to properly use this ability
      return `${anchor[target]} ${words[1]} cap is required to properly use this ability`;
    }
  } else if (decision === 1) {
    //is a scale
    let targetText = anchor.target === 2 ? "all enemies" : (anchor.target === 1 ? "target" : "self");
    details = parseScaleField(anchor, target, values, total, targetText);
  } else if (decision === 2) {
    //is a repeatable
    details = ["", []];
    if (target === "repeatable") {
      // keeps track of how many times the ability repeats
      let totalRepeat = 0;
      let max = "";
      let current = "";
      for (let scope = 0; scope < values.length; scope++) {
        if (values[scope] === "current") {
          //ex: This ability repeats 2 times
          current = `This ability repeats ${anchor[target][values[scope]]} times`;
          totalRepeat += anchor[target][values[scope]];
        }
        if (values[scope] === "max") {
          //ex: This ability repeats 2 times by default, but can repeat up to 10 times;
          max = ` by default, but can repeat up to ${anchor[target][values[scope]]} times.`;
        }
      }
      details[0] = current + max;
      details[1] = [];
      for (let scope = 0; scope < extra.length; scope++) {
        for (let scopeTarget = 0; scopeTarget < extraValues[scope].length; scopeTarget++) {
          //ex: a multiplier is recieved for every 10 points in mind cap
          //code ex: a multiplier is recieved for every character.abilities[slot].ability.mindRepeat.cap points...

          //repeatWords splits something like mindRepeat into "mind" and "Repeat"
          let repeatWords = extra[scope].split(/(?=[A-Z])/);
          details[1].push(
            `- an extra repeat is recieved for every ${anchor[extra[scope]][extraValues[scope][scopeTarget]]} points in ${repeatWords[0]} ${
              extraValues[scope][scopeTarget]
            }.`
          );
          //code ex for adding to totalRepeat: Math.floor(total.mind.cap/anchor.mindRepeat.cap)
          totalRepeat += Math.floor(total[repeatWords[0]][extraValues[scope][scopeTarget]] / anchor[extra[scope]][extraValues[scope][scopeTarget]]);
        }
      }
      if (max) details[0] += ` Will repeat ${totalRepeat} times`;
    }
  } else if (decision === 3) {
    //is an effect
    details = [["", []]];
    for (let selectedEffect = 0; selectedEffect < anchor[target].length; selectedEffect++) {
      let targetText = anchor[target][selectedEffect].target === 2 ? "all enemies" : (anchor[target][selectedEffect].target ? "target" : "self");
      details[selectedEffect][0] = `${anchor[target][selectedEffect].name}`;
      details[selectedEffect][1].push(`effects ${targetText} for ${anchor[target][selectedEffect].turns} turns`);
      for (let scope = 0; scope < anchor[target][selectedEffect].modifiers.length; scope++) {
        let modifier = anchor[target][selectedEffect].modifiers[scope];
        if(modifier.scale) {
          details[selectedEffect][1].push(parseScaleField(modifier, "scale", values[selectedEffect][3][scope][1], total, targetText, modifier.target));
        } else {
          details[selectedEffect][1].push([`- applies ${modifier.target} for ${anchor[target][selectedEffect].turns} turns on ${targetText}`])
        }
      }
    }
  }

  return details;
}

function parseSlottedAbility(slot, character, equipped) {
  let fields = parseFields(slot.ability);
  let targets = [];
  let details = [];
  let total = parseTotalStats(character, equipped);

  //Getting targets array setup, targets contains the values that the field would contain
  for (let i = 0; i < fields.length; i++) {
    targets.push(parseTarget(slot.ability, fields[i]));
  }

  //Looping through each field
  for (let i = 0; i < fields.length; i++) {
    if (Array.isArray(targets[i])) {
      if (fields[i] === "repeatable") {
        let extra = [];
        let extraValues = [];
        console.log(extra);
        console.log(extraValues)
        for (let scope = 0; scope < fields.length; scope++) {
          if (fields[scope] === "mindRepeat" || fields[scope] === "bodyRepeat" || fields[scope] === "soulRepeat") {
            extra.push(fields[scope]);
            extraValues.push(targets[scope]);
            fields.splice(scope, 1);
            targets.splice(scope, 1);
          }
        }
        details = details.concat(parseField(slot.ability, fields[i], targets[i], total, extra, extraValues));
      } else if (fields[i] === "effects") {
        details = details.concat(parseField(slot.ability, fields[i], targets[i], total));
      } else if (fields[i] === "damage" || fields[i].slice(-4) === "Gain") {
        details = details.concat(parseField(slot.ability, fields[i], targets[i], total));
      }
    } else {
      //If it is an integer
      if (slot.ability[fields[i]]) details = details.concat(parseField(slot.ability, fields[i], targets[i], total));
    }
  }



  return details;
}

function slottedAbilityDetails(slot, character, equipped) {
  let details = parseSlottedAbility(slot, character, equipped);
  let fields = parseFields(slot.ability);
  let htmlExport = [];

  let integers = ["healthCost", "manaCost", "staminaCost", "shieldCost", "mindReq", "bodyReq", "soulReq"];
  let scales = ["damage", "mana", "stamina", "shield", "healthGain", "manaGain", "staminaGain", "shieldGain"];

  for (let i = 0; i < fields.length; i++) {
    if (fields[i] === "mindRepeat" || fields[i] === "bodyRepeat" || fields[i] === "soulRepeat") {
      fields.splice(i, 1);
    }
  }

  let fieldCount = 0;

  for (let i = 0; i < details.length; i++) {
    if (integers.includes(fields[fieldCount])) {
      htmlExport.push(
        <span
          className="subheader"
          style={{
            fontSize: "14px",
            textAlign: "center",
            marginTop: "2px",
            fontFamily: "Piazzolla",
            marginRight: "6px",
            backgroundColor: "#222",
            borderRadius: "2px",
            paddingLeft: "4px",
            paddingRight: "4px",
          }}
          key={`${i}-${Math.random()}`}
        >
          {details[i]}
        </span>
      );
    } else if (scales.includes(fields[fieldCount]) || fields[fieldCount] === "repeatable") {
      htmlExport.push(
        <h1
          className="subheader"
          style={{
            fontSize: "14px",
            textAlign: "left",
            marginTop: "5px",
            fontFamily: "Piazzolla",
          }}
          key={`${i}-${Math.random()}`}
        >
          {details[i]}
        </h1>
      );
      i++;
      for (let scope = 0; scope < details[i].length; scope++) {
          htmlExport.push(
            <h1
              className="subheader"
              style={{
                fontSize: "12px",
                textAlign: "left",
                marginTop: "1px",
                marginLeft: "5px",
                fontFamily: "Piazzolla",
                marginBottom: scope + 1 === details[i].length ? "20px" : "",
              }}
              key={`${i}-${Math.random()}`}
            >
              {details[i][scope]}
            </h1>
          );
      }
    } else if (fields[fieldCount] === "effects") {
      htmlExport.push(
        <h1
          className="subheader"
          style={{
            fontSize: "14px",
            textAlign: "left",
            marginTop: "5px",
            fontFamily: "Piazzolla",
          }}
          key={`${i}-${Math.random()}`}
        >
          {`${details[i][0]} - ${details[i][1][0]}`}
        </h1>
      );

      for (let modNum = 1; modNum < details[i][1].length; modNum++) {
        htmlExport.push(
          <h1
            className="subheader"
            style={{
              fontSize: "12px",
              textAlign: "left",
              marginTop: "1px",
              marginLeft: "5px",
              fontFamily: "Piazzolla",
            }}
            key={`${i}-${Math.random()}`}
          >
            {details[i][1][modNum][0]}
          </h1>
        );
        if (details[i][1][modNum].length > 1 && details[i][1][modNum][1].length > 0) {
          for (let modDetails = 0; modDetails < details[i][1][modNum][1].length; modDetails++) {
            htmlExport.push(
              <h1
                className="subheader"
                style={{
                  fontSize: "12px",
                  textAlign: "left",
                  marginTop: "1px",
                  marginLeft: "5px",
                  fontFamily: "Piazzolla",
                  marginBottom: modDetails + 1 === details[i][1][1][1].length ? "20px" : "",
                }}
                key={`${i}-${Math.random()}`}
              >
                {details[i][1][modNum][1][modDetails]}
              </h1>
            );
          }
        }
      }
    }
    fieldCount++;
  }

  return htmlExport;
}

export {
  equipmentCheck,
  compareType,
  checkCategory,
  categoryDetails,
  parseEquipped,
  abilityArray,
  parseFields,
  parseTarget,
  parseSlottedAbility,
  slottedAbilityDetails,
};
