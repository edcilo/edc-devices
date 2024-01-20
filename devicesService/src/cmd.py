import typer
from src.db import db_migrate, db_seed

app = typer.Typer()


@app.command(name="db:migrate", help="Migrates the database")
def dbmigrate():
    typer.echo("Migrating database...")
    db_migrate()


@app.command(name="db:seed", help="Seeds the database")
def dbseed():
    typer.echo("Seeding database...")
    db_seed()
