import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import * as middlewares from "./middlewares";
import api from "./api";
import MessageResponse from "./interfaces/MessageResponse";
import bodyParser from "body-parser";

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

export interface CustomerResponse {
  customer: Customer;
}

class Customer {
  name: string;
  phone: string;
  email: string;

  constructor(name: string, phone: string, email: string) {
    this.name = name;
    this.phone = phone;
    this.email = email;
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
}

app.post<{}, CustomerResponse>("/customer", (req, res) => {
  res.json({
    customer: new Customer("serdar", req.body.phone, "serdar@serdar"),
  });
});

app.post<{}, PizzaResponse>("/pizzas", (req, res) => {

  const dietary = new Dietary(DietaryType.Meat,'Etli');
  const dietary2 = new Dietary(DietaryType.Cheese,'Peynirli');
  const dietary3 = new Dietary(DietaryType.Vegatable,'Sebzeli');
  const dietary4 = new Dietary(DietaryType.Vegan,'Vegan');

  const topping = new Topping('Sucuk','Halal Sucuk',dietary,24);
  const topping2= new Topping('Mantar','Fırınlanmıs zeytinyaglı',dietary3,25);
  const topping3= new Topping('Kecı Peyniri','Italyan keçi peyniri',dietary2,19);
  const topping4= new Topping('Kasar Peyniri','İzmir kasar peyniri',dietary2,22);
  const topping5= new Topping('Zeytin','İzmir zeytini',dietary3,14);

  const toppings = [topping,topping2,topping3,topping4,topping5];
  const toppings2 = [topping,topping3,topping4,topping5];

  const pizza = new Pizza('Margherita','Italyan ekşi mayalı ev yapımı domates soslu',dietary,toppings2,199);
  const pizza2 = new Pizza('Sucuklu','İzmir sucuklu',dietary,toppings,250);

  res.json({
    pizza: [pizza,pizza2]
  });
});

export interface PizzaResponse {
  pizza: Pizza[];
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





app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
