"""TableServices

Revision ID: 55acac2b12bf
Revises: 
Create Date: 2022-05-17 22:44:00.777724

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '55acac2b12bf'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    table_services = op.create_table('services',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.bulk_insert(
        table_services,
        [
            {'name': 'Netflix'},
            {'name': 'Hulu'},
            {'name': 'Amazon Prime Video'},
            {'name': 'HBO Max'},
            {'name': 'Paramount'},
            {'name': 'Plus'},
            {'name': 'Peacock'}
        ]
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('services')
    # ### end Alembic commands ###