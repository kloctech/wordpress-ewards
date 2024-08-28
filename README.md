Plugin Name: eWards
Plugin URI:
Description: eWards is an Integrated platform for customer retention and marketing automation.
Version: 1.0.3
Author: Kloc Technologies PVT LTD
Author URI: https://kloctechnologies.com
License: GPL-2.0+
License URI: http://www.gnu.org/licenses/gpl-2.0.txt

Tested up to: 7.4
Requires PHP: 7.4
Stable tag: 1.0.3

# WordPress eWards Integration

## Introduction

### `WordPress eWards Frontend`

This frontend React application serves as an iframe embedded within a WordPress website through a custom plugin. It facilitates user verification and redemption of points or available coupons for discounts on products within the WooCommerce plugin.

## Features

- Seamless integration with WordPress websites through a custom plugin.
- User-friendly interface for account verification and redemption of points or coupons.
- Real-time interaction with the eWards system to ensure accurate points and coupon balances.
- Customizable design and styling to match the look and feel of the WordPress website.

## Installation

To install and embed this application within a WordPress website, follow these steps:

1. Clone this [repository](https://github.com/kloctech/wordpress-ewards) to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install all dependencies required for running this application.

### Dependencies

- React
- ReactDOM
- axios
- bootstrap
- dotenv
- wordpress/block-editor
- wordpress/components
- wordpress/element

### Environment Variables

Before running the application, you need to create an environment file (`.env`) and add the following variable:

- `PRDOUCTION_URL`: The production URL for reference. See `.env.sample` for an example.

## Available Scripts

In the project directory, you can run the following scripts:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
