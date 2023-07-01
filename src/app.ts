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

app.post<{}, CustomerResponse>("/pizzas", (req, res) => {
  res.json({
    customer: new Customer("serdar", req.body.phone, "serdar@serdar"),
  });
});

export interface PizzaResponse {
  pizza: Pizza;
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
