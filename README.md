<a href="https://polybot-dashboard.vercel.app/">
   <img src="./extras/art.png">
</a>

<h1 align="center">
 PolyBot Dashboard
</h1>
<p align="center">
   The dashboard for PolyBot built using <a href="https://nextjs.org/">Next.JS</a>. This app is built as a part of the larger <a href="https://github.com/AnmolPlayzz/polybot">PolyBot</a> Project.
</p>

<p align="center">
   <a href="https://polybot-dashboard.vercel.app/">https://polybot-dashboard.vercel.app/</a>
</p>
<p align="center">
   <img src="https://vercelbadge.vercel.app/api/anmolplayzz/polybot-dashboard" alt="vercel">

</p>

## Developer Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A running instance of PolyBot
- PolyBot API (see installation instructions below)
- Neon Postgres database (see setup instructions below)

### Neon Postgres Setup

1. Sign up for a Neon account at https://neon.tech if you haven't already.
2. Create a new project in your Neon dashboard.
3. In your project, create a new database for PolyBot Dashboard.
4. Note down the connection string provided by Neon. It should look something like this:
   ```psql
   postgres://user:password@database-name.region-name.aws.neon.tech/neondb?options
   ```

This Database will be used for user authentication 

### Installation

1. First, clone and set up the PolyBot API repository:
   ```
   git clone https://github.com/anmolplayzz/polybot-api.git
   cd polybot-api
   npm install
   # Follow the setup instructions in the polybot-api README
   ```

2. Clone the PolyBot Dashboard repository:
   ```
   git clone https://github.com/anmolplayzz/polybot-dashboard.git
   ```

3. Navigate to the project directory:
   ```
   cd polybot-dashboard
   ```

4. Install dependencies:
   ```
   npm install
   ```

5. Create a `.env` file in the root directory and add your configuration:
   ```
   TOKEN="Discord Bot Token"
   CLIENT_ID="Discord Bot Client ID"
   CLIENT_SECRET="Discord Bot Client Secret"
   DATABASE_URL="Neon Serverless PostgreSQL URI"
   MONGODB_URI="MongoDB URI (From the main PolyBot Project)"
   PB_API="URL to PolyBot API"
   REDIRECT_URL="Redirect URL (needs to be setup in the developer dashboard at discord.dev too)
   ```

6. Build the dashboard:
   ```
   npm run build
   ```

7. Start the dashboard:
   ```
   npm start
   ```

8. Ensure that your PolyBot API is running.

9. The dashboard will be available at `http://localhost:3000`

**Note:** it is highly recommended to host the dashboard on a serverless platform like [vercel](https://vercel.com) or [netlify](https://netlify.com) (both are free).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Next.JS and React
- [Discord.JS](https://discordjs.dev/)
- [Lucia Auth](https://lucia-auth.com/)
- [Arctic](https://arctic.js.org/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any problems or have any questions about setup, please open an issue on this repository or join the [official support server](https://discord.gg/AY77nuxZyk) and report it there.

