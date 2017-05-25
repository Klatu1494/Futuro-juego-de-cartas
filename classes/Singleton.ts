/**
 * @fileoverview Contains the Singleton class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * A reference to a single object.
 * @class
 */
abstract class Singleton {
    errorMessage: string;
    instance: any;

    /**
     * Creates a singleton.
     */
    constructor() {
        this.constructor.prototype.instance = this.createInstance();
    }

    createInstance() {
        throw new Error('An abstract class cannot be instantiated.');
    }

    getInstance(): any {
        if (!this.instance) this.createInstance()
        return this.instance;
    }
}

Singleton.prototype.instance = null;
Singleton.prototype.errorMessage = 'A Singleton can only be instantiated once.';