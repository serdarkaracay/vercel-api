import exp from "constants";

export default interface MessageResponse {
  message: string;
}

export interface CustomerResponse {
  customer: Customer;
}

export default interface OrderResponse {}

export default interface PizzaResponse {}

class Customer {
  name: string;
  phone: string;
  email: string;
  orders: Order[];
  constructor(name: string, phone: string, email: string, orders: Order[]) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.orders = orders;
  }
  getCustomerName() {
    return this.name;
  }
  getCustomerPhone() {
    return this.phone;
  }
  getCustomerEmail() {
    return this.email;
  }
  getCustomerOrders() {
    return this.orders;
  }
}

class Order {
  items: Item[];
  date: Date;
  location: string;
  constructor(items: Item[], date: Date, location: string) {
    this.items = items;
    this.date = date;
    this.location = location;
  }
}

class Item {
  productId: number;
  prodoctName: string;
  constructor(productId: number, prodoctName: string) {
    this.productId = productId;
    this.prodoctName = prodoctName;
  }
}

class location {
  city: string;
  town: string;
  constructor(city: string, town: string) {
    this.city = city;
    this.town = town;
  }
}

class trend {
  trendId: number;
  county: string;
  constructor(trendId: number, county: string) {
    this.trendId = trendId;
    this.county = county;
  }
}

class Pizza {
  name: string;
  description: string;
  diartary: Dietary;
  toppings: Topping[];
  price: number;
  constructor(
    name: string,
    description: string,
    diartary: Dietary,
    toppings: Topping[], price: number
  ) {
    this.name = name;
    this.description = description;
    this.diartary = diartary;
    this.toppings = toppings;
    this.price = price;
  }
}

class Topping {
  name: string;
  description: string;
  diartary: Dietary;
  price: number;

  constructor(name: string, description: string, diartary: Dietary, price: number) {
    this.name = name;
    this.description = description;
    this.diartary = diartary;
    this.price = price;
  }
}

class Dietary {
  type: DietaryType;
  description: string;

  constructor(type: DietaryType, description: string) {
    this.type = type;
    this.description = description;
  }
}

enum DietaryType {
  Meat,
  Cheese,
  Vegatable,
  Vegan,
}
