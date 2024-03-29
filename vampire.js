class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const thisVampireParents = this.numberOfVampiresFromOriginal;
    const thatVampireParents = vampire.numberOfVampiresFromOriginal;

    return (thisVampireParents < thatVampireParents) ? true : false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let thisVampire = this;

    if (thisVampire === vampire) {
      return thisVampire;
    }

    if (thisVampire.isMoreSeniorThan(vampire)) {
      const vampireParent = vampire.creator;
      return thisVampire.closestCommonAncestor(vampireParent);
    } else if (vampire.isMoreSeniorThan(thisVampire)) {
      const thisVampireParent = thisVampire.creator;
      return thisVampireParent.closestCommonAncestor(vampire);
    } else {
      const thisVampireParent = thisVampire.creator;
      return thisVampireParent.closestCommonAncestor(vampire);
    }
  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name){
      return this;
    }
    for (const vampire of this.offspring) {
      const foundVampire = vampire.vampireWithName(name);
      if (foundVampire !== null) {
        // If we found the vampire in one of the offspring, return it
        return foundVampire;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 0;

    for (const vampire of this.offspring) {
      total++;
      total += vampire.totalDescendents;
    }

    return total;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let vampires = [];

    if (this.yearConverted > 1980) {
      vampires.push(this);
    }

    for (const vampire of this.offspring) {
      const newVampires = vampire.allMillennialVampires;
      vampires = vampires.concat(newVampires);
    }

    return vampires;
  }
};

module.exports = Vampire;