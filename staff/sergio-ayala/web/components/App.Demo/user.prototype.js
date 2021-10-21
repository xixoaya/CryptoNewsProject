function User(alias, email, psswd) {
    this.alias = alias;
    this.email = email;
    this.psswd = psswd;
}

User.prototype.getAlias = function() {
    return this.alias;
}

User.prototype.setAlias = function(x) {
    this.alias = x;
    return this.getAlias();
}

User.prototype.getEmail = function() {
    return this.email;
}

User.prototype.setEmail = function(x) {
    this.email = x;
    return this.getEmail();
}

User.prototype.getPsswd = function() {
    return this.psswd;
}

User.prototype.setPsswd = function(x) {
    this.psswd = x;
    return this.getPsswd();
}