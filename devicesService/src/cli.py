import typer

from .db import db_migrate, db_seed

cli = typer.Typer()


@cli.command(name="db:migrate", help="Migrates the database")
def dbmigrate():
    typer.echo("Migrating database...")
    db_migrate()


@cli.command(name="db:seed", help="Seeds the database")
def dbseed():
    typer.echo("Seeding database...")
    db_seed()
